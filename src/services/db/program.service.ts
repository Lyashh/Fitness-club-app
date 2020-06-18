import { getRepository } from "typeorm";
import Program from "../../db/entity/program.entity";
import UserService from "./user.service";
import ExerciseService from "./exercise.service";
import Exercise from "../../db/entity/exsercise.entity";

export default class ProgramService {
  public static getProgramById(id: number) {
    return getRepository(Program)
      .findOne({
        where: { id },
        select: ["id", "name", "updatedAt", "createdAt"],
        relations: ["users", "coach", "exercises", "exercises.category"],
      })
      .then((program) => {
        if (program) {
          return program;
        }
        return Promise.reject({
          httpStatus: 404,
          message: `Program with id: ${id} not found`,
        });
      });
  }

  public static async getAllPrograms() {
    const programs = await getRepository(Program).find({
      relations: ["users", "coach", "exercises", "exercises.category"],
    });

    /* const programs = this.programRepository
       .createQueryBuilder("program")
      .leftJoinAndSelect("program.coach", "user")
      .leftJoinAndSelect("user.role", "role")
      .select(["program.name", "user.name", "role.name"])
      .getMany();  */
    return programs;
  }

  public static createProgram(coachId: number, name: string) {
    return UserService.getUserById(coachId, true).then(async (coach) => {
      let program = new Program();
      program.name = name;
      program.coach = coach;

      const newProgram = getRepository(Program).create(program);
      await getRepository(Program).save(newProgram);
      return newProgram;
    });
  }

  public static async deleteProgram(id: number) {
    const deleteResponse = await getRepository(Program).delete(id);
    if (deleteResponse.affected === 1) {
      return deleteResponse;
    }
    return Promise.reject({
      httpStatus: 404,
      message: `Program with id: ${id} not found`,
    });
  }

  public static updateProgram(id: number, updateData: any) {
    updateData.updatedAt = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return getRepository(Program)
      .update(id, updateData)
      .then(async (updateResponse) => {
        return ProgramService.getProgramById(id);
      });
  }

  public static addExercisesToProgram(
    exerciseIds: Array<number>,
    programId: number
  ) {
    let tempExercises: null | Array<Exercise> = null;
    return ExerciseService.getExercisesByIdsArray(exerciseIds)
      .then((exercises) => {
        tempExercises = exercises;
        return ProgramService.getProgramById(programId);
      })
      .then(async (program) => {
        if (tempExercises) {
          program.exercises = [...program.exercises, ...tempExercises];
          await getRepository(Program).save(program);
          return ProgramService.getProgramById(programId);
        }
      });
  }

  public static removeExerciseFromProgram(
    exerciseIds: Array<number>,
    programId: number
  ) {
    return ProgramService.getProgramById(programId).then(async (program) => {
      program.exercises = program.exercises.filter((exercise) => {
        const inProgram = exerciseIds.some((reqId) => {
          return exercise.id === reqId;
        });
        return !inProgram;
      });
      await getRepository(Program).save(program);
      return ProgramService.getProgramById(programId);
    });
  }

  public static programHaveErxercises(
    exerciseIds: Array<number>,
    programId: number
  ) {
    return ProgramService.getProgramById(programId).then((program) => {
      //check ids that not exist in program
      const IdsNotExistInProgram = exerciseIds?.filter((reqExerciseID) => {
        const haveExercise = program.exercises.some((exercise) => {
          return reqExerciseID === exercise.id;
        });
        return !haveExercise;
      });

      if (IdsNotExistInProgram.length === 0) {
        return true;
      }

      return Promise.reject({
        httpStatus: 404,
        message: `Exercises with id: ${IdsNotExistInProgram.join(
          ", "
        )} not found in Program id: ${programId}`,
      });
    });
  }
}
