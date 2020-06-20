import {
  editProgramRequest,
  deletePrExerciseRequest,
  getProgramById,
  assingPrExerciseRequest,
} from "./../../api/programs.api";
import { types, flow, getParent } from "mobx-state-tree";
import program from "../models/program";
import CustomError from "../../types/customError.types";
import rootStore from "../stores/rootStore";

const currentProgramStore = types
  .model("CurrentProgramStore", {
    program,
  })
  .actions((self) => {
    const getProgram = flow(function* (programId: number) {
      try {
        const program = yield getProgramById(programId);
        self.program.setFields({
          name: program.data.name,
          id: program.data.id,
          exercises: program.data.exercises,
        });
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

    const editProgram = flow(function* (name: string) {
      try {
        const updatedProgram = yield editProgramRequest({
          id: self.program.id,
          newFields: { name },
        });
        self.program.setName(updatedProgram.data.name);
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

    const deleteExercise = flow(function* (exercisesIds: number[]) {
      try {
        const updatedProgram = yield deletePrExerciseRequest(
          exercisesIds,
          self.program.id
        );
        self.program.setExercises(updatedProgram.data.exercises);
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

    const addExercise = flow(function* (exercisesIds: number[]) {
      try {
        const updatedProgram = yield assingPrExerciseRequest(
          exercisesIds,
          self.program.id
        );
        self.program.setExercises(updatedProgram.data.exercises);
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

    return {
      getProgram,
      editProgram,
      deleteExercise,
      addExercise,
    };
  });

export default currentProgramStore;
