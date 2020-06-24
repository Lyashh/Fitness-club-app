import joi from "@hapi/joi";
import MainValidation from "./main.validation";

export default class ProgramValidation extends MainValidation {
  public static newProgram(newProgram: any) {
    const schema = joi.object({
      name: joi.string().min(3).max(50).required(),
    });
    return schema.validate(newProgram);
  }

  public static updateProgram(newFields: any) {
    const schema = joi.object({
      id: joi.number().integer().required(),
      newFields: joi
        .object({
          name: joi.string().min(3).max(50).required(),
        })
        .required(),
    });
    return schema.validate(newFields);
  }

  public static addOrRemoveExerciseToProgram(bodyWithIds: any) {
    const schema = joi.object({
      exercisesIds: joi.array().items(joi.number().integer()).min(1).required(),
      id: joi.number().integer().required(), //programId
    });
    return schema.validate(bodyWithIds);
  }
}
