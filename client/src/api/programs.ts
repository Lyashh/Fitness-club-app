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
