import axios from "axios";

export const userByIdRequest = (id: number) => {
  return axios.get(`/api/users/${id}`);
};

export const usersWithCoachPrograms = (id: number) => {
  return axios.get(`/api/users/${id}/oneCoachPrograms`);
};

export const unassignProgramRequest = (userId: number, programId: number) => {
  return axios.patch(`/api/users/unAssignProgram`, { userId, programId });
};

export const assignProgramRequest = (userId: number, programId: number) => {
  return axios.patch(`/api/users/assignProgram`, { userId, programId });
};

export const athleteRequest = () => {
  return axios.get("/api/users/athletes");
};
