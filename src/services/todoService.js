import API from "./api";

const handle = async (promise) => {
  try {
    const res = await promise;
    return res?.data?.data ?? null; // safe access
  } catch (error) {
    console.error("Todo API Error:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    throw message;
  }
};

// ✅ GET TODOS
export const getTodos = (params = {}) =>
  handle(API.get("/tasks", { params }));

// ✅ METRICS
export const getTaskMetrics = () =>
  handle(API.get("/tasks/metrics"));

// ✅ CREATE
export const createTodo = (data = {}) =>
  handle(API.post("/tasks", data));

// ✅ UPDATE
export const updateTodo = (id, data = {}) =>
  handle(API.put(`/tasks/${id}`, data));

// ✅ DELETE (special handling)
export const deleteTodo = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);
    return true; 
  } catch (error) {
    console.error("Delete Todo Error:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to delete task";

    throw message;
  }
};