import { types, Instance } from "mobx-state-tree";
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
  profileStore: {
    user: { id: 0, name: "", role: { id: 0, name: "" } },
    isAuth: false,
  },
  usersStore: { users: [] },
});

export default rootStore;

export type Root = Instance<typeof rootStore>;
