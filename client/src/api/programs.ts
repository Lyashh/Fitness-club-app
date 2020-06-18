import axios from "axios";

export const programsRequest = () => {
  return axios.get("/api/auth/profile/programs");
};
