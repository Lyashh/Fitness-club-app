import { registrationBody } from "./../types/api.types";
import axios from "axios";

export const loginRequest = (email: string, password: string) => {
  return axios.post("/api/auth/login", { email: email, password: password });
};

export const profileRequest = () => {
  return axios.get("/api/auth/profile");
};

export const logOutRequest = () => {
  return axios.post("/api/auth/logout");
};

export const registrationRequest = (newUser: registrationBody) => {
  newUser.roleId = 1;
  return axios.post("/api/auth/registration", newUser);
};
