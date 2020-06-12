import joi from "@hapi/joi";
import MainValidation from "./main.validation";

export default class UserValidation extends MainValidation {
  public static newUser(newUser: any) {
    const schema = joi.object({
      name: joi.string().alphanum().min(3).max(50).required(),
      age: joi.number().integer().min(1).required(),
      email: joi.string().email().min(5).max(100).required(),
      password: joi.string().alphanum().min(8).max(30).required(),
      roleId: joi.number().integer(),
    });
    return schema.validate(newUser);
  }

  public static updateUser(modifyUSer: any) {
    const schema = joi.object({
      name: joi.string().alphanum().min(3).max(50),
      age: joi.number().integer().min(1),
      email: joi.string().email().min(5).max(100),
      password: joi.string().alphanum().min(8).max(30),
    });
    return schema.validate(modifyUSer);
  }
}
