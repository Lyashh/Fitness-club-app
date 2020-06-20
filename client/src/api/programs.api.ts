import { editProgram } from "../types/api.types";
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

export const assingPrExerciseRequest = (exercisesIds: number[], id: number) => {
  return axios.patch("/api/programs/addExercises", { exercisesIds, id });
};

export const deletePrExerciseRequest = (exercisesIds: number[], id: number) => {
  console.log({ exercisesIds });
  console.log({ id });

  return axios.patch("/api/programs/removeExercises", { id: id, exercisesIds });
};
