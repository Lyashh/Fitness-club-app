import { types } from "mobx-state-tree";
import user from "../models/user";

const profileStore = types.model("ProfileStore", {
  user: types.maybeNull(user),
});

export default profileStore;
