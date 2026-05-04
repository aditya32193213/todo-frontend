// src/hooks/useTaskMetrics.js
import { useState, useCallback } from "react";
import { getTaskMetrics } from "../services/todoService";

const EMPTY_METRICS = { total: 0, completed: 0, inProgress: 0, pending: 0, pct: 0 };

const useTaskMetrics = () => {
  const [counts, setCounts] = useState(EMPTY_METRICS);
  const [error, setError]   = useState(false);

  const fetchMetrics = useCallback(async () => {
    try {
      const data = await getTaskMetrics();
      setCounts(data || EMPTY_METRICS);
      setError(false);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[useTaskMetrics] Failed to fetch task counts:", err?.message);
      }
      setError(true);
    }
  }, []);

  return { counts, fetchMetrics, error };
};

export default useTaskMetrics;