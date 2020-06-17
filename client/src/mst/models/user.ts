import { types } from "mobx-state-tree";

const user = types.model("user", {
  id: types.integer,
  name: types.string,
  email: types.maybeNull(types.string),
  age: types.maybeNull(types.string),
  role: types.maybeNull(types.string),
});

export default user;
