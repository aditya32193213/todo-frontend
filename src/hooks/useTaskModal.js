import { useState, useCallback } from "react";

const EMPTY_FORM = { title: "", description: "", status: "pending" };

const useTaskModal = () => {
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [modalMode,    setModalMode]    = useState("create");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [formData,     setFormData]     = useState(EMPTY_FORM);

  const openCreate = useCallback(() => {
    setModalMode("create");
    setSelectedTodo(null);
    setFormData(EMPTY_FORM);
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((todo) => {
    setModalMode("edit");
    setSelectedTodo(todo);
    setFormData({
      title:       todo.title,
      description: todo.description || "",
      status:      todo.status      || "pending",
    });
    setIsModalOpen(true);
  }, []);

  const openDelete = useCallback((todo) => {
    setModalMode("delete");
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setFormData(EMPTY_FORM);
  }, []);

  return {
    isModalOpen, modalMode, selectedTodo,
    formData, setFormData,
    openCreate, openEdit, openDelete, closeModal,
  };
};

export default useTaskModal;