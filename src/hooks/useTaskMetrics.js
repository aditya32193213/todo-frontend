import { useState, useCallback } from "react";
import { getTaskMetrics } from "../services/todoService";

const EMPTY_METRICS = { total: 0, completed: 0, inProgress: 0, pending: 0, pct: 0 };

const useTaskMetrics = () => {
  const [counts, setCounts] = useState(EMPTY_METRICS);

  const fetchMetrics = useCallback(async () => {
    try {
      const data = await getTaskMetrics();
      setCounts(data);
    } catch (err) {
      // Metrics are non-critical display data — a failed fetch leaves the
      // previous counts visible rather than crashing the page.
      //
      // FIX: previously the catch block was completely empty. Any failure
      // (network error, wrong endpoint, 401, server down) produced zero
      // diagnostic output during development, making the root cause invisible.
      // The dev-mode warning below surfaces these failures immediately without
      // polluting production logs.
      if (process.env.NODE_ENV === "development") {
        console.warn("[useTaskMetrics] Failed to fetch task counts:", err?.message);
      }
    }
  }, []);

  return { counts, fetchMetrics };
};

export default useTaskMetrics;