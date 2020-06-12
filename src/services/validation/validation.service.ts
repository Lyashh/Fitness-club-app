import joi from "@hapi/joi";

export default class ValidationService {
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

  public static paramsIsNumber(params: Array<any>) {
    const schema = joi.array().items(joi.number().integer());
    return schema.validate(params);
  }

  public static idIsNumber(id: any) {
    const schema = joi.number().integer().min(1).required();
    return schema.validate(id);
  }
}
