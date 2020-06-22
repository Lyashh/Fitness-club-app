import axios from "axios";

export const userByIdRequest = (id: number) => {
  return axios.get(`/api/users/${id}`);
};

export const unassignProgramRequest = (userId: number, programId: number) => {
  return axios.patch(`/api/users/unAssignProgram`, { userId, programId });
};
