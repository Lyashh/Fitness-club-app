import { types, Instance } from "mobx-state-tree";
import exercice from "./exercise";
import user from "./user";

const program = types.model("Program", {
  id: types.integer,
  name: types.string,
  coach: types.maybeNull(user),
  exercises: types.array(exercice),
});

export type ProgramModel = Instance<typeof program>;

export default program;
