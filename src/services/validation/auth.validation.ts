import joi from "@hapi/joi";

export default class AuthValidation {
  public static login(loginUser: any) {
    const schema = joi.object({
      email: joi.string().email().min(5).max(100).required(),
      password: joi.string().alphanum().min(8).max(30).required(),
    });
    return schema.validate(loginUser);
  }
}
