import API from "./api";

// No try-catch needed — the interceptor already rejects with the proper message
const handle = (promise) => promise.then((res) => res?.data?.data ?? null);

export const getTodos = (params = {}) =>
  handle(API.get("/tasks", { params }));

export const getTaskMetrics = () =>
  handle(API.get("/tasks/metrics"));

export const createTodo = (data = {}) =>
  handle(API.post("/tasks", data));

export const updateTodo = (id, data = {}) =>
  handle(API.put(`/tasks/${id}`, data));

export const deleteTodo = async (id) => {
  await API.delete(`/tasks/${id}`);
  return true;
};