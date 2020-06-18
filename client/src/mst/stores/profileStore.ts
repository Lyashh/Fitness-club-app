import { profileRequest } from "./../../api/auth";
import { types, flow } from "mobx-state-tree";
import user from "../models/user";
import { loginRequest } from "../../api/auth";
import CustomError from "../../types/customError.types";

const profileStore = types
  .model("ProfileStore", {
    user: types.maybeNull(user),
    isAuth: types.boolean,
  })
  .actions((self) => {
    const setLogin = flow(function* (
      emailInput: string,
      passwordInput: string
    ) {
      try {
        const user = yield loginRequest(emailInput, passwordInput);
        const { name, email, age } = user.data;
        self.user?.setFields({ name, email, age });
        self.isAuth = true;
      } catch (error) {
        if (error.response.data.message) {
          self.isAuth = false;
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    const setProfile = flow(function* () {
      try {
        const profile = yield profileRequest();
        const { name, email, age } = profile.data;
        self.user?.setFields({ name, email, age });
        self.isAuth = true;
      } catch (error) {
        self.isAuth = false;
        if (error.response.data.message) {
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    return { setLogin, setProfile };
  });

export default profileStore;
