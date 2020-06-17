import { types } from "mobx-state-tree";
import user from "../models/user";

const usersStore = types.model("usersStore", {
  user: types.array(user),
});

export default usersStore;