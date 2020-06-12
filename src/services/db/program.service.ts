import { getRepository } from "typeorm";
import Program from "../../db/entity/program.entity";

export default class ProgramService {
  private programRepository = getRepository(Program);

  public getProgramById(id: number) {
    return this.programRepository
      .findOne({
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
    return programs;
  }

  public async createProgram(programData: any) {
    const newProgram = {
      id: 3,
      name: "Program 2",
      coach: {
        name: "Coach 2",
        id: 3,
      },
      exsercises: [],
    };
    return newProgram;
  }

  public async deleteProgram(id: number) {
    return true;
  }

  public async updateProgram(id: number, updateData: any) {
    const updateProgram = {
      id: 1,
      name: "Program 1 Edit",
      coach: {
        name: "Coach 1",
        id: 2,
      },
      exsercises: [
        { id: 1, name: "exsercise 1", quantity: 20, category: "category 1" },
        { id: 5, name: "exsercise 4", quantity: 5, category: "category 2" },
        { id: 11, name: "exsercise 2", quantity: 10, category: "category 1" },
      ],
    };
    return updateProgram;
  }
}
