import { types, Instance, cast } from "mobx-state-tree";
import exercice, { ExirciseModel } from "./exercise";
import user from "./user";

const program = types
  .model("Program", {
    id: types.integer,
    name: types.string,
    coach: types.maybeNull(user),
    exercises: types.array(exercice),
  })
  .actions((self) => {
    const setFields = (fields: any) => {
      self.name = fields.name;
      self.id = fields.id;
      self.exercises = fields.exercises;
    };

    const setExercises = (exercises: Array<ExirciseModel>) => {
      self.exercises = cast(exercises);
    };

    return { setFields, setExercises };
  });

export type ProgramModel = Instance<typeof program>;

export default program;
