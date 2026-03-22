import API from "./api";


export const getTodos = async (params = {}) => {
  const res = await API.get("/tasks", { params });
  return res.data.data;
};

export const getTaskMetrics = async () => {
  const res = await API.get("/tasks/metrics");
  return res.data.data;
};

export const createTodo = async (data) => {
  const res = await API.post("/tasks", data);
  return res.data.data;
};

export const updateTodo = async (id, data) => {
  const res = await API.put(`/tasks/${id}`, data);
  return res.data.data;
};

export const deleteTodo = async (id) => {
  await API.delete(`/tasks/${id}`);
};