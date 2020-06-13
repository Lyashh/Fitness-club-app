import { getRepository } from "typeorm";
import Exercise from "../../db/entity/exsercise.entity";
export default class ExerciseService {
  public static async getAllExercises() {
    return await getRepository(Exercise).find({ relations: ["category"] });
  }
}
