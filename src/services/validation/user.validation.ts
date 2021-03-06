import joi from "@hapi/joi";
import MainValidation from "./main.validation";

export default class UserValidation extends MainValidation {
  public static newUser(newUser: any) {
    const schema = joi.object({
      name: joi.string().min(3).max(50).required(),
      age: joi.number().integer().min(18).required().max(100),
      email: joi.string().email().min(5).max(100).required(),
      password: joi.string().min(8).max(30).required(),
      roleId: joi.number().integer().required(),
    });
    return schema.validate(newUser);
  }

  public static updateUser(modifyUSer: any) {
    const schema = joi.object({
      name: joi.string().min(3).max(50),
      age: joi.number().integer().min(18).max(100),
      email: joi.string().email().min(5).max(100),
      password: joi.string().min(8).max(30),
    });
    return schema.validate(modifyUSer);
  }

  public static assignAndUnProgramToUser(ids: any) {
    const schema = joi.object({
      userId: joi.number().integer().min(1).required(),
      programId: joi.number().integer().min(1).required(),
    });
    return schema.validate(ids);
  }
}
