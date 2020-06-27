import { types, Instance, cast } from "mobx-state-tree";
import exercice, { ExirciseModel } from "./exercise";

const program = types
  .model("Program", {
    id: types.integer,
    name: types.string,
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

    const setName = (name: string) => {
      self.name = name;
    };

    return { setFields, setExercises, setName };
  });

export type ProgramModel = Instance<typeof program>;

export default program;
