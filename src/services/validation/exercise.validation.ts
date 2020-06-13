import joi from "@hapi/joi";
import MainValidation from "./main.validation";

export default class ExerciseValidation extends MainValidation {
  public static newExercise(newUser: any) {
    const schema = joi.object({
      name: joi.string().alphanum().min(3).max(50).required(),
      categoryId: joi.number().integer().required(),
      quantity: joi.number().integer().required(),
    });
    return schema.validate(newUser);
  }
}
