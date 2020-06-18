import { programsRequest } from "./../../api/programs";
import { types, flow, getParent } from "mobx-state-tree";
import program from "../models/program";
import CustomError from "../../types/customError.types";
import rootStore from "../stores/rootStore";

const programStore = types
  .model("ProgramStore", {
    programs: types.array(program),
  })
  .actions((self) => {
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

    return { setPrograms };
  });

export default programStore;
