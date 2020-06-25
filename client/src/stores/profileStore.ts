import { logOutRequest } from "../api/auth.api";
import { profileRequest } from "../api/auth.api";
import { types, flow, cast } from "mobx-state-tree";
import user from "../models/user";
import { loginRequest } from "../api/auth.api";
import CustomError from "../types/customError.types";

export const defaultUser = {
  id: 0,
  name: "",
  email: "",
  role: { id: 0, name: "" },
};

const profileStore = types
  .model("ProfileStore", {
    user: types.maybeNull(user),
    isAuth: types.boolean,
  })
  .actions((self) => {
    const cleanAuthData = () => {
      self.isAuth = false;
      self.user = cast(defaultUser);
    };
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
        const { name, email, age, id, role } = user.data;
        self.user?.setFields({ name, email, age, id, role });
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
        const { name, email, age, id, role } = profile.data;
        self.user?.setFields({ name, email, age, id, role });
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

    const logOut = flow(function* () {
      try {
        yield logOutRequest();
        cleanAuthData();
      } catch (error) {
        if (error.response) {
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });

    return { setLogin, setProfile, setIsAuth, cleanAuthData, logOut };
  })
  .views((self) => {
    const isAuthAndCoach = (): boolean => {
      if (self.isAuth && self.user?.role.name === "coach") {
        return true;
      }
      return false;
    };
    return { isAuthAndCoach };
  });

export default profileStore;
