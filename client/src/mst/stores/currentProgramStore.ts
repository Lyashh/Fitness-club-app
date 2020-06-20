import { editProgramRequest } from "./../../api/programs.api";
import { types, flow, getParent } from "mobx-state-tree";
import program from "../models/program";
import CustomError from "../../types/customError.types";
import { getProgramById } from "../../api/programs.api";
import rootStore from "../stores/rootStore";

const currentProgramStore = types
  .model("CurrentProgramStore", {
    program,
    toDeleteExercise: types.array(types.integer),
    toAssingExercise: types.array(types.integer),
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
        const editedProgram = editProgramRequest({
          id: self.program.id,
          newFields: { name },
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

    return { getProgram, editProgram };
  });

export default currentProgramStore;
