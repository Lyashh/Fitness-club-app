import { types } from "mobx-state-tree";

const category = types.model("Category", {
  id: types.integer,
  name: types.string,
});

export default category;
