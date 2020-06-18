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
    const setIsAuth = (authStatus: boolean) => {
      self.isAuth = authStatus;
    };

    const setLogin = flow(function* (
      emailInput: string,
      passwordInput: string
    ) {
      try {
        const user = yield loginRequest(emailInput, passwordInput);
        console.log(user);
        const { name, email, age, id } = user.data;
        self.user?.setFields({ name, email, age, id });
        self.isAuth = true;
      } catch (error) {
        if (error.response) {
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
        console.log(profile.data);

        const { name, email, age, id } = profile.data;
        self.user?.setFields({ name, email, age, id });
        self.isAuth = true;
      } catch (error) {
        self.isAuth = false;
        if (error.response) {
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    return { setLogin, setProfile, setIsAuth };
  });

export default profileStore;
