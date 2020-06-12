import joi from "@hapi/joi";

export default class MainValidation {
  public static paramsIsNumber(params: Array<any>) {
    const schema = joi.array().items(joi.number().integer());
    return schema.validate(params);
  }

  public static idIsNumber(id: any) {
    const schema = joi.number().integer().min(1).required();
    return schema.validate(id);
  }
}
