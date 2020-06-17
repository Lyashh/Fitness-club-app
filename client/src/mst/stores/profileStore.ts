import { types } from "mobx-state-tree";

const profileStore = types.model("ProfileStore", {
  id: types.integer,
  name: types.string,
  email: types.maybeNull(types.string),
  age: types.maybeNull(types.string),
  role: types.maybeNull(types.string),
});

export default profileStore;
