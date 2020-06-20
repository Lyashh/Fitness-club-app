import { ExirciseModel } from './../models/exercise';
import { getExercisesRequest } from "./../../api/exercise.api";
import { types, flow, getParent } from "mobx-state-tree";
import exercise from "../models/exercise";
import CustomError from "../../types/customError.types";
import rootStore from "./rootStore";

const exerciseStore = types
  .model("ExerciseStore", {
    exercises: types.optional(types.array(exercise), []),
  })
  .actions((self) => {
    const getExercises = flow(function* () {
      try {
        const exercises = yield getExercisesRequest();
        self.exercises = exercises.data;
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            getParent<typeof rootStore>(self).profileStore.setIsAuth(false);
          }
          throw new CustomError(
            error.response.data.message,
            error.response.status
          );
        }
        throw error;
      }
    });
    return { getExercises };
  })
  .views((self) => {
    const getAvailable = () => {
      return self.exercises.filter((exercise) => {
        const inProgram = getParent<typeof rootStore>(
          self
        ).currentProgramStore.program.exercises.some((prExercise) => {
          return exercise.id === prExercise.id;
        });
        return !inProgram;
      }) as Array<ExirciseModel>;
    };

    return { getAvailable };
  });

export default exerciseStore;
