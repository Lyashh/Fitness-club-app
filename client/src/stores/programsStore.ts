import { programsRequest, createProgramRequest } from "../api/programs.api";
import { types, flow, getParent, cast } from "mobx-state-tree";
import program from "../models/program";
import { CustomError } from "../types/customError.types";
import rootStore from "../stores/rootStore";

const programStore = types
  .model("ProgramStore", {
    programs: types.array(program),
  })
  .actions((self) => {
    const clear = () => {
      self.programs = cast([]);
    };

    const setPrograms = flow(function* () {
      try {
        const programs = yield programsRequest();
        self.programs = programs.data;
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

    const createProgram = flow(function* (name: string) {
      try {
        const newProgram = yield createProgramRequest(name);
        return newProgram;
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

    return { setPrograms, createProgram, clear };
  })
  .views((self) => {
    const programsThatNotAssign = () => {
      return self.programs.filter((program) => {
        const assigned = getParent<typeof rootStore>(
          self
        ).currentUserStore.user.programs.some((userProgram) => {
          return program.id === userProgram.id;
        });
        return !assigned;
      });
    };
    return { programsThatNotAssign };
  });

export default programStore;
