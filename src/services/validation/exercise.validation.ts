import joi from "@hapi/joi";
import MainValidation from "./main.validation";

export default class ExerciseValidation extends MainValidation {
  public static newExercise(newExercise: any) {
    const schema = joi.object({
      name: joi.string().min(3).max(50).required(),
      categoryId: joi.number().integer().required(),
      quantity: joi.number().integer().required(),
    });
    return schema.validate(newExercise);
  }

  public static updateExercise(modifiedExercise: any) {
    const schema = joi.object({
      id: joi.number().integer().required(),
      newFields: joi
        .object({
          name: joi.string().min(3).max(50),
          quantity: joi.number().integer(),
        })
        .required(),
    });
    return schema.validate(modifiedExercise);
  }
}
