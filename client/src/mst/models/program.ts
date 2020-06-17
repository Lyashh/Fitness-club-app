import { types } from "mobx-state-tree";
import exercice from "./exercise";
import user from "./user";

const program = types.model("Program", {
  id: types.integer,
  name: types.string,
  coach: user,
  exercises: types.array(exercice),
});

export default program;
