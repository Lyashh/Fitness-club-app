import { types } from "mobx-state-tree";
import exercise from "../models/exercise";

const exerciseStore = types.model("ExerciseStore", {
  exercises: types.optional(types.array(exercise), []),
});

export default exerciseStore;
