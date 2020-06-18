import { types } from "mobx-state-tree";
import role from "./role";

const user = types
  .model("user", {
    id: types.integer,
    name: types.string,
    email: types.maybeNull(types.string),
    age: types.maybeNull(types.string),
    role: role,
  })
  .actions((self) => {
    const setFields = (fields: any) => {
      self.id = fields.email;
      self.email = fields.email;
      self.name = fields.name;
      self.age = fields.age;
      self.role = fields.role;
    };

    return { setFields };
  });

export default user;
