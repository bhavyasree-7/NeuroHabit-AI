import api from "./api";

export const login = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);