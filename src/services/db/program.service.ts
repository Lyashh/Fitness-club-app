import { getRepository } from "typeorm";
import Program from "../../db/entity/program.entity";
import UserService from "./user.service";

export default class ProgramService {
  private programRepository = getRepository(Program);
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getProgramById(id: number) {
    return this.programRepository
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

  public async getAllPrograms() {
    const programs = await this.programRepository.find({
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

  public createProgram(coachId: number, name: string) {
    return this.userService.getUserById(coachId).then(async (coach) => {
      if (coach.role.name === "coach") {
        let program = new Program();
        program.name = name;
        program.coach = coach;

        const newProgram = this.programRepository.create(program);
        await this.programRepository.save(newProgram);
        return newProgram;
      }
      return Promise.reject({
        httpStatus: 403,
        message: "You don't have permission to create programs",
      });
    });
  }

  public async deleteProgram(id: number) {
    const deleteResponse = await this.programRepository.delete(id);
    if (deleteResponse.affected === 1) {
      return deleteResponse;
    }
    return Promise.reject({
      httpStatus: 404,
      message: `Program with id: ${id} not found`,
    });
  }

  public async updateProgram(id: number, updateData: any) {
    updateData.updatedAt = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return this.programRepository
      .update(id, updateData)
      .then(async (updateResponse) => {
        return this.getProgramById(id);
      });
  }
}
