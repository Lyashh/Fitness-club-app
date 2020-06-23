import {
  userByIdRequest,
  unassignProgramRequest,
  assignProgramRequest,
  usersWithCoachPrograms,
} from "./../../api/user.api";
import {} from "./../../api/programs.api";
import { types, flow, getParent, cast } from "mobx-state-tree";
import CustomError from "../../types/customError.types";
import rootStore from "../stores/rootStore";
import user from "../models/user";

const currentUserStore = types
  .model("currentUserStore", {
    user,
  })
  .actions((self) => {
    const getUser = flow(function* (userId: number) {
      try {
        const { data } = yield usersWithCoachPrograms(userId);
        self.user.setFieldsWithPrograms(data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            getParent<typeof rootStore>(self).profileStore.setIsAuth(false);
          }
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    const unassignProgram = flow(function* (programId: number) {
      try {
        const { data } = yield unassignProgramRequest(self.user.id, programId);
        self.user.programs = cast(
          self.user.programs.filter((pr) => {
            return pr.id !== programId;
          })
        );
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            getParent<typeof rootStore>(self).profileStore.setIsAuth(false);
          }
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    const assignProgram = flow(function* (programId: number) {
      try {
        const { data } = yield assignProgramRequest(self.user.id, programId);
        console.log(self.user.id);
        console.log(programId);

        console.log(data.programs);

        self.user.programs = data.programs;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            getParent<typeof rootStore>(self).profileStore.setIsAuth(false);
          }
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    return {
      getUser,
      assignProgram,
      unassignProgram,
    };
  });

export default currentUserStore;
