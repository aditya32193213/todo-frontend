import { useState, useEffect, useCallback } from "react";
import { getTodos } from "../services/todoService";
import useDebounce from "./useDebounce";

export const LIMIT = 5;

const useTaskList = () => {
  const [todos,      setTodos]      = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total,      setTotal]      = useState(0);
  const [exitId,     setExitId]     = useState(null);

  const [searchRaw,    setSearchRawInternal]    = useState("");
  const [statusFilter, setStatusFilterInternal] = useState("all");
  const [sortOrder,    setSortOrderInternal]    = useState("latest");

  const debouncedSearch = useDebounce(searchRaw, 400);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: LIMIT, sort: sortOrder };
      if (statusFilter !== "all")  params.status = statusFilter;
      if (debouncedSearch.trim()) params.search  = debouncedSearch.trim();

      const data = await getTodos(params);
      setTodos(data?.tasks ?? []);
      setTotalPages(data.pages || 1);
      setTotal(data.total   || 0);
    } catch (err) {
      const _msg = typeof err === "string" ? err : err?.message || "Failed to load tasks";
      setError(_msg);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, sortOrder, debouncedSearch]);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const setStatusFilter = useCallback((val) => {
    setStatusFilterInternal(val);
    setPage(1);
  }, []);

  const setSearchRaw = useCallback((val) => {
    setSearchRawInternal(val);
    setPage(1);
  }, []);
  const setSortOrder = useCallback((val) => {
    setSortOrderInternal(val);
    setPage(1);
  }, []);

  const isFiltering = searchRaw.trim() !== "" || statusFilter !== "all";

  return {
    todos, setTodos, loading, error,
    exitId, setExitId,
    page, setPage, totalPages, total,
    searchRaw, setSearchRaw,
    statusFilter, setStatusFilter,
    sortOrder, setSortOrder,
    fetchTodos, isFiltering,
  };
};

export default useTaskList;