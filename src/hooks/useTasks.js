import { useEffect } from "react";
import useTaskList      from "./useTaskList";
import useTaskMetrics   from "./useTaskMetrics";
import useTaskModal     from "./useTaskModal";
import useTaskMutations from "./useTaskMutations"; // FIX 9: renamed file

export { STATUSES } from "../features/tasks/taskConstants";

const useTasks = () => {
  const list    = useTaskList();
  const metrics = useTaskMetrics();
  const modal   = useTaskModal();

  const { fetchMetrics } = metrics;

  const mutations = useTaskMutations({
    setTodos:     list.setTodos,
    fetchTodos:   list.fetchTodos,
    fetchMetrics,
    modal,
    setExitId:    list.setExitId,
  });

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  return {
    todos:        list.todos,
    loading:      list.loading,
    error:        list.error,
    exitId:       list.exitId,
    page:         list.page,
    setPage:      list.setPage,
    totalPages:   list.totalPages,
    total:        list.total,
    isFiltering:  list.isFiltering,
    fetchTodos:   list.fetchTodos,

    searchRaw:       list.searchRaw,
    setSearchRaw:    list.setSearchRaw,
    statusFilter:    list.statusFilter,
    setStatusFilter: list.setStatusFilter,
    sortOrder:       list.sortOrder,
    setSortOrder:    list.setSortOrder,

    metrics: metrics.counts,

    isModalOpen:  modal.isModalOpen,
    modalMode:    modal.modalMode,
    formData:     modal.formData,
    setFormData:  modal.setFormData,
    openCreate:   modal.openCreate,
    openEdit:     modal.openEdit,
    openDelete:   modal.openDelete,
    closeModal:   modal.closeModal,

    handleSave:         mutations.handleSave,
    handleStatusChange: mutations.handleStatusChange,
    handleSeed:         mutations.handleSeed,
    seeding:            mutations.seeding,
    isMutating:         mutations.isMutating, // FIX 5: thread through for modal button
  };
};

export default useTasks;