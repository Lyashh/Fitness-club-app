import { editProgram } from "./../types/index.types";
import axios from "axios";

export const programsRequest = () => {
  return axios.get("/api/auth/profile/programs");
};

export const createProgramRequest = (name: string) => {
  return axios.post("/api/programs", { name });
};

export const getProgramById = (id: number) => {
  return axios.get(`/api/programs/${id}`);
};

export const editProgramRequest = (data: editProgram) => {
  return axios.patch(`/api/programs`, data);
};
