import { types } from "mobx-state-tree";
import role from "./role";

const user = types
  .model("user", {
    id: types.integer,
    name: types.string,
    email: types.maybeNull(types.string),
    age: types.maybeNull(types.integer),
    role: role,
  })
  .actions((self) => {
    const setFields = (fields: any) => {
      self.email = fields.email;
      self.name = fields.name;
      self.age = fields.age;
      self.id = fields.id;
    };

    return { setFields };
  });

export default user;
