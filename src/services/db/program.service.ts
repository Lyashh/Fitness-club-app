import { getRepository } from "typeorm";
import Program from "../../db/entity/program.entity";
import UserService from "./user.service";

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
    return UserService.getUserById(coachId).then(async (coach) => {
      if (coach.role.name === "coach") {
        let program = new Program();
        program.name = name;
        program.coach = coach;

        const newProgram = getRepository(Program).create(program);
        await getRepository(Program).save(newProgram);
        return newProgram;
      }
      return Promise.reject({
        httpStatus: 403,
        message: "You don't have permission to create programs",
      });
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
}
