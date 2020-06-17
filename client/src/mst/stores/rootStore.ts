import { types } from "mobx-state-tree";
import programStore from "./programsStore";
import exerciseStore from "./exerciseStore";
import usersStore from "./usersStore";
import profileStore from "./profileStore";

const rootStore = types.model("RootStore", {
  programStore,
  exerciseStore,
  profileStore,
  usersStore,
});

export const createRootStore = rootStore.create({
  programStore: { programs: [] },
  exerciseStore: { exercises: [] },
  profileStore: { user: null },
  usersStore: { users: [] },
});

export default rootStore;
