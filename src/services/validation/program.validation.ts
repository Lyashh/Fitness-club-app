import joi from "@hapi/joi";
import MainValidation from "./main.validation";

export default class ProgramValidation extends MainValidation {
  public static newProgram(newProgram: any) {
    const schema = joi.object({
      name: joi.string().alphanum().min(3).max(50).required(),
      coachId: joi.number().integer().required(),
    });
    return schema.validate(newProgram);
  }

  public static updateProgram(newField: any) {
    const schema = joi.object({
      name: joi.string().alphanum().min(3).max(50).required(),
    });
    return schema.validate(newField);
  }
}
