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

  public static getExerciseById(id: number) {
    return getRepository(Exercise)
      .findOne(id, {
        relations: ["category"],
      })
      .then((exercise) => {
        if (exercise) {
          return exercise;
        } else {
          return Promise.reject({
            httpStatus: 404,
            message: `Exercise with id: ${id} not found`,
          });
        }
      });
  }

  public static async getExercisesByIdsArray(ids: Array<number>) {
    const formatIds = ids.map((id) => {
      return { id };
    });
    return getRepository(Exercise).find({ where: formatIds });
  }

  public static async deleteExercise(id: number) {
    const deleteResponse = await getRepository(Exercise).delete(id);
    if (deleteResponse.affected === 1) {
      return deleteResponse;
    }
    return Promise.reject({
      httpStatus: 404,
      message: `Exercise with id: ${id} not found`,
    });
  }

  public static updateExercise(id: number, updateData: any) {
    return getRepository(Exercise)
      .update(id, updateData)
      .then(async (updateResponse) => {
        return ExerciseService.getExerciseById(id);
      });
  }

  public static exercisesExist(exerciseIds: Array<number>) {
    return ExerciseService.getExercisesByIdsArray(exerciseIds).then(
      (exercises) => {
        //check if req exercise ids exist in db
        const notExistExercises = exerciseIds.filter((reqId) => {
          const exerciseExist = exercises.some((exercise) => {
            return exercise.id === reqId;
          });
          return !exerciseExist;
        });
        if (notExistExercises.length === 0) {
          return true;
        }
        return Promise.reject({
          httpStatus: 404,
          message: `Exercises with id: ${notExistExercises.join(
            ", "
          )} not found`,
        });
      }
    );
  }
}
