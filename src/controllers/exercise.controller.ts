import { Request, Response } from "express";
import ExerciseService from "../services/db/exercise.service";

export default class ExerciseController {
  public getAllExercises() {
    return async (req: Request, res: Response) => {
      const exercises = await ExerciseService.getAllExercises();
      return res.json(exercises);
    };
  }
}
