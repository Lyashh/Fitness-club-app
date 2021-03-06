import { types, Instance } from "mobx-state-tree";
import programStore from "./programsStore";
import exerciseStore from "./exerciseStore";
import usersStore from "./usersStore";
import profileStore from "./profileStore";
import currentProgramStore from "./currentProgramStore";
import currentUserStore from "../stores/currentUserStore";

const rootStore = types.model("RootStore", {
  programStore,
  currentProgramStore,
  currentUserStore,
  exerciseStore,
  profileStore,
  usersStore,
});

export const createRootStore = rootStore.create({
  programStore: { programs: [] },
  currentProgramStore: {
    program: {
      id: 0,
      name: "",
    },
  },
  currentUserStore: {
    user: {
      id: 0,
      name: "",
      email: "",
      age: 0,
      programs: [],
      role: { id: 0, name: "" },
    },
  },
  exerciseStore: { exercises: [] },
  profileStore: {
    user: { id: 0, name: "", email: "", role: { id: 0, name: "" } },
    isAuth: false,
  },
  usersStore: { users: [] },
});

export default rootStore;

export type Root = Instance<typeof rootStore>;
