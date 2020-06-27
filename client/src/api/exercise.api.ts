import axios from "axios";

export const getExercisesRequest = () => {
  return axios.get("/api/exercises");
};
