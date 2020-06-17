import { types } from "mobx-state-tree";

const role = types.model("Role", {
  id: types.integer,
  name: types.string,
});

export default role;
