import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { createTodo, updateTodo, deleteTodo } from "../services/todoService";
import { SEED_TASKS } from "../features/tasks/seedTasks";

const toastForError = (err) => {
  if (!navigator.onLine || err.code === "ERR_NETWORK") {
    toast.error("No internet connection. Please check your network.");
  } else if (err?.response?.status >= 400 && err?.response?.status < 500) {
    toast.error(err?.response?.data?.message || "Invalid request. Please check your input.");
  } else {
    toast.error("Something went wrong on our end. Please try again.");
  }
};

const useTaskMutations = ({ setTodos, fetchTodos, fetchMetrics, modal, setExitId }) => {
  const { modalMode, selectedTodo, formData, closeModal } = modal;
  const [seeding,    setSeeding]    = useState(false);

  // FIX 5: two separate primitives for two separate concerns:
  //   isSaving (ref)   — prevents double-submit, no re-render needed
  //   isMutating (state) — drives the Save button spinner, needs re-render
  const isSaving = useRef(false);
  const [isMutating, setIsMutating] = useState(false);

  const handleSave = useCallback(async () => {
    if (isSaving.current) return;
    isSaving.current = true;
    setIsMutating(true);

    try {
      if (modalMode !== "delete" && !formData.title?.trim()) {
        toast.error("Title is required");
        return;
      }

      if (modalMode === "create") {
        await createTodo(formData);
        // Fetch the real list so total + totalPages are accurate rather than
        // inserting optimistically and leaving pagination counts stale.
        await fetchTodos();
        fetchMetrics();
        toast.success("Task created 🎉");
        closeModal();

      } else if (modalMode === "edit") {
        const updated = await updateTodo(selectedTodo._id, formData);
        setTodos((prev) => prev.map((t) => (t._id === selectedTodo._id ? updated : t)));
        toast.success("Task updated ✅");
        closeModal();

      } else {
        // FIX 1: isSaving is reset INSIDE the setTimeout callback's own finally,
        // not in the outer finally. The outer finally runs synchronously right
        // after closeModal + setExitId — before the 220ms timer fires. If we
        // reset isSaving there, the guard opens again during the animation window,
        // allowing a second delete on a different card before the first resolves.
        closeModal();
        setExitId(selectedTodo._id);

        const targetId = selectedTodo._id; // capture before closeModal clears modal state

        setTimeout(async () => {
          try {
            await deleteTodo(targetId);
            setTodos((prev) => prev.filter((t) => t._id !== targetId));
            fetchMetrics();
            toast.success("Task deleted");
          } catch (err) {
            toastForError(err);
          } finally {
            setExitId(null);
            isSaving.current = false; // FIX 1: reset here, after the async work completes
            setIsMutating(false);
          }
        }, 220);

        return; // FIX 1: skip the outer finally reset for the delete branch
      }
    } catch (err) {
      toastForError(err);
    } finally {
      // Only reached by create and edit branches (delete returns early above)
      isSaving.current = false;
      setIsMutating(false);
    }
  }, [modalMode, formData, selectedTodo, setTodos, fetchTodos, fetchMetrics, closeModal, setExitId]);

  const handleStatusChange = useCallback(async (todo, newStatus) => {
    setTodos((prev) => prev.map((t) => (t._id === todo._id ? { ...t, status: newStatus } : t)));
    try {
      const updated = await updateTodo(todo._id, { status: newStatus });
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? updated : t)));
      const labels = { pending: "Pending", "in-progress": "In Progress", completed: "Completed" };
      toast.success(`Marked as ${labels[newStatus]} ✓`);
      fetchMetrics();
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === todo._id ? todo : t)));
      toastForError(err);
    }
  }, [setTodos, fetchMetrics]);

  const handleSeed = useCallback(async () => {
    setSeeding(true);
    try {
      await Promise.all(SEED_TASKS.map((task) => createTodo(task)));
      await Promise.all([fetchTodos(), fetchMetrics()]);
      toast.success("Sample tasks added 🌱");
    } catch (_e) {
      toast.error("Failed to seed tasks");
    } finally {
      setSeeding(false);
    }
  }, [fetchTodos, fetchMetrics]);

  return { handleSave, handleStatusChange, handleSeed, seeding, isMutating };
};

export default useTaskMutations;