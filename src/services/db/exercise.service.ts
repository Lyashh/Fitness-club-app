import { getRepository } from "typeorm";
import Exercise from "../../db/entity/exsercise.entity";
import CategoryService from "./category.service";
export default class ExerciseService {
  public static async getAllExercises() {
    return await getRepository(Exercise).find({ relations: ["category"] });
  }

  public static createExercise(exerciseBody: any) {
    return CategoryService.getCategoryById(exerciseBody.categoryId).then(
      async (category) => {
        if (category) {
          let exercise = new Exercise();
          exercise.name = exerciseBody.name;
          exercise.quantity = exerciseBody.quantity;
          exercise.category = category;

          const newExercise = getRepository(Exercise).create(exercise);
          await getRepository(Exercise).save(newExercise);
          return newExercise;
        }
        return Promise.reject({
          httpStatus: 404,
          message: `Category with id: ${exerciseBody.categoryId} not found`,
        });
      }
    );
  }
}
