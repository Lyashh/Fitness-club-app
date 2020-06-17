import { types } from "mobx-state-tree";
import category from "./category";

const exercise = types.model("Exercise", {
  id: types.integer,
  name: types.string,
  quantity: types.integer,
  category: category,
});

export default exercise;
