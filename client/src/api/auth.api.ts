import axios from "axios";

export const loginRequest = (email: string, password: string) => {
  return axios.post("/api/auth/login", { email: email, password: password });
};

export const profileRequest = () => {
  return axios.get("/api/auth/profile");
};
