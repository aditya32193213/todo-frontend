// src/hooks/useTaskMutations.js
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

const useTaskMutations = ({
  setTodos,
  fetchTodos,
  fetchMetrics,
  modal,
  setExitId,
  page,        // ← new
  setPage,     // ← new
}) => {
  const { modalMode, selectedTodo, formData, closeModal } = modal;
  const [seeding, setSeeding] = useState(false);
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
        await fetchTodos();
        fetchMetrics();
        toast.success("Task created 🎉");
        closeModal();
      } else if (modalMode === "edit") {
        const updated = await updateTodo(selectedTodo._id, formData);
        setTodos((prev) =>
          prev.map((t) => (t._id === selectedTodo._id ? updated : t))
        );
        toast.success("Task updated ✅");
        closeModal();
      } else {
        // Delete
        closeModal();
        setExitId(selectedTodo._id);

        // Wait for exit animation
        await new Promise((res) => setTimeout(res, 220));
        await deleteTodo(selectedTodo._id);

        setTodos((prev) => {
          const remaining = prev.filter((t) => t._id !== selectedTodo._id);
          // If we emptied the current page and there are earlier pages, go back one
          if (remaining.length === 0 && page > 1) {
            setPage(page - 1);   // triggers a re-fetch automatically
          }
          return remaining;
        });

        fetchMetrics();
        toast.success("Task deleted");
      }
    } catch (err) {
      if (modalMode === "delete") setExitId(null);
      toastForError(err);
    } finally {
      isSaving.current = false;
      setIsMutating(false);
    }
  }, [
    modalMode, formData, selectedTodo, setTodos, fetchTodos, fetchMetrics,
    closeModal, setExitId, page, setPage,
  ]);

  const handleStatusChange = useCallback(
    async (todo, newStatus) => {
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? { ...t, status: newStatus } : t))
      );
      try {
        const updated = await updateTodo(todo._id, { status: newStatus });
        setTodos((prev) =>
          prev.map((t) => (t._id === todo._id ? updated : t))
        );
        const labels = {
          pending: "Pending",
          "in-progress": "In Progress",
          completed: "Completed",
        };
        toast.success(`Marked as ${labels[newStatus]} ✓`);
        fetchMetrics();
      } catch (err) {
        setTodos((prev) =>
          prev.map((t) => (t._id === todo._id ? todo : t))
        );
        toastForError(err);
      }
    },
    [setTodos, fetchMetrics]
  );

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