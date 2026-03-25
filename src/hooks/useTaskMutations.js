import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { createTodo, updateTodo, deleteTodo } from "../services/todoService";
import { SEED_TASKS } from "../features/tasks/seedTasks";

const toastForError = (err) => {
  if (typeof err === "string") {
    toast.error(err);
    return;
  }

  if (!navigator.onLine) {
    toast.error("No internet connection. Please check your network.");
  } else {
    toast.error(err?.message || "Something went wrong");
  }
};

const useTaskMutations = ({ setTodos, fetchTodos, fetchMetrics, modal, setExitId }) => {
  const { modalMode, selectedTodo, formData, closeModal } = modal;
  const [seeding,    setSeeding]    = useState(false);

  const isSaving = useRef(false);
  const [isMutating, setIsMutating] = useState(false);

  const handleSave = useCallback(async () => {
    if (isSaving.current) return;
    isSaving.current = true;
    setIsMutating(true);

    try {
      if (modalMode !== "delete" && !formData.title?.trim()) {
        toast.error("Title is required");
        isSaving.current = false;
        setIsMutating(false);
        return;
      }

      if (modalMode === "create") {
        await createTodo(formData);
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
        closeModal();
        setExitId(selectedTodo._id);

        const targetId = selectedTodo._id; 

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
            isSaving.current = false; 
            setIsMutating(false);
          }
        }, 220);

        return; 
      }
    } catch (err) {
      toastForError(err);
    } finally {
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