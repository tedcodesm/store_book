import api from "./axios";

export const createBook = (data) => api.post("/volume/create", data);
export const getBooks = (page = 1, limit = 5) =>
  api.get("/volume", { params: { page, limit } });
export const deleteBook = (id) => api.delete(`/volume/${id}`);
export const contentBook = (id) => api.get(`/volume/content/${id}`);
export const getMyBooks = () => api.get("/volume/user");
