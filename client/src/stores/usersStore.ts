import { coachUsersRequest } from "../api/auth.api";
import { types, flow, getParent, cast } from "mobx-state-tree";
import user from "../models/user";
import CustomError from "../types/customError.types";
import rootStore from "./rootStore";

const usersStore = types
  .model("usersStore", {
    users: types.optional(types.array(user), []),
  })
  .actions((self) => {
    const clear = () => {
      self.users = cast([]);
    };
    const getCoachUsers = flow(function* () {
      try {
        const users = yield coachUsersRequest();
        self.users = users.data;
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
    return { getCoachUsers, clear };
  });

export default usersStore;
