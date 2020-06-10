import { getRepository } from "typeorm";
import Program from "../../db/entity/program.entity";

export default class ProgramService {
  private userRepository = getRepository(Program);

  public async getProgramById(id: number) {
    const program = {
      id: 1,
      name: "Program 1",
      coach: {
        name: "Coach 1",
        id: 2,
      },
      exsercises: [
        { id: 1, name: "exsercise 1", quantity: 20 },
        { id: 5, name: "exsercise 4", quantity: 5 },
        { id: 11, name: "exsercise 2", quantity: 10 },
      ],
    };
    return program;
  }

  public async getAllPrograms() {
    const programs = [
      {
        id: 1,
        name: "Program 1",
        coach: {
          name: "Coach 1",
          id: 2,
        },
        exsercises: [
          { id: 1, name: "exsercise 1", quantity: 20 },
          { id: 5, name: "exsercise 4", quantity: 5 },
          { id: 11, name: "exsercise 2", quantity: 10 },
        ],
      },
      {
        id: 2,
        name: "Program 2",
        coach: {
          name: "Coach 1",
          id: 2,
        },
        exsercises: [
          { id: 19, name: "exsercise 29", quantity: 2 },
          { id: 3, name: "exsercise 9", quantity: 40 },
          { id: 11, name: "exsercise 2", quantity: 4 },
        ],
      },
    ];
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
        { id: 1, name: "exsercise 1", quantity: 20 },
        { id: 5, name: "exsercise 4", quantity: 5 },
        { id: 11, name: "exsercise 2", quantity: 10 },
      ],
    };
    return updateProgram;
  }
}
