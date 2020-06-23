import { types, Instance } from "mobx-state-tree";
import role from "./role";
import program from "./program";

const user = types
  .model("user", {
    id: types.integer,
    name: types.string,
    email: types.string,
    age: types.maybeNull(types.integer),
    role: role,
    programs: types.optional(types.array(program), []),
  })
  .actions((self) => {
    const setFields = (fields: any) => {
      self.email = fields.email;
      self.name = fields.name;
      self.age = fields.age;
      self.id = fields.id;
      self.role = fields.role;
    };

    const setFieldsWithPrograms = (fields: any) => {
      self.email = fields.email;
      self.name = fields.name;
      self.age = fields.age;
      self.id = fields.id;
      self.role = fields.role;
      self.programs = fields.programs;
    };

    return { setFields, setFieldsWithPrograms };
  });

export type UserModel = Instance<typeof user>;

export default user;
