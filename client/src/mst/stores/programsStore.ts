import { types } from "mobx-state-tree";
import program from "../models/program";

const programStore = types.model("ProgramStore", {
  programs: types.optional(types.array(program), []),
});

export default programStore;