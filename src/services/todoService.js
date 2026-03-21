import API from "./api";


export const getTodos = async (params = {}) => {
  const res = await API.get("/tasks", { params });
  return res.data.data;
};

export const getTaskMetrics = async () => {
  const res = await API.get("/tasks/metrics");
  // Backend: { success, message, data: { total, completed, inProgress, pending, pct } }
  return res.data.data;
};

export const createTodo = async (data) => {
  const res = await API.post("/tasks", data);
  // Backend: { success, message, data: task }
  return res.data.data;
};

export const updateTodo = async (id, data) => {
  const res = await API.put(`/tasks/${id}`, data);
  // Backend: { success, message, data: updatedTask }
  return res.data.data;
};

export const deleteTodo = async (id) => {
  // Backend returns 204 No Content — no body to read.
  await API.delete(`/tasks/${id}`);
};