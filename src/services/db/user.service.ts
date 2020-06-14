import { getRepository } from "typeorm";
import RoleService from "./role.service";
import ProgramService from "./program.service";
import User from "../../db/entity/user.entity";
import Program from "../../db/entity/program.entity";

export default class UserService {
  public static getUserById(id: number) {
    return getRepository(User)
      .findOne(id, {
        relations: ["role", "programs", "coachPrograms"],
      })
      .then((user) => {
        if (user) {
          return user;
        } else {
          return Promise.reject({
            httpStatus: 404,
            message: `User with id: ${id} not found`,
          });
        }
      });
  }

  public static async getAllUsers() {
    const users = await getRepository(User).find({
      relations: ["role", "programs", "coachPrograms"],
    });
    return users;
  }

  public static createUser(userReq: any): Promise<User> {
    return RoleService.getRoleById(userReq.roleId).then(async (role) => {
      if (role) {
        let user = new User();
        user.name = userReq.name;
        user.age = userReq.age;
        user.email = userReq.email;
        user.password = userReq.password;
        user.role = role;

        const newUser = getRepository(User).create(user);
        await getRepository(User).save(newUser);
        return newUser;
      }
      return Promise.reject({
        httpStatus: 404,
        message: `Role with id: ${userReq.roleId} not found`,
      });
    });
  }

  public static async deleteUser(id: number) {
    const deleteResponse = await getRepository(User).delete(id);
    if (deleteResponse.affected === 1) {
      return deleteResponse;
    }
    return Promise.reject({
      httpStatus: 404,
      message: `User with id: ${id} not found`,
    });
  }

  //find user by id first
  public static updateUser(id: number, updateData: any) {
    updateData.updatedAt = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return getRepository(User)
      .update(id, updateData)
      .then(async (updateResponse) => {
        return this.getUserById(id);
      });
  }

  public assignProgramToUser(userId: number, programId: number) {
    let tempProgram: null | Program = null;
    return ProgramService.getProgramById(programId)
      .then((program: Program) => {
        tempProgram = program;
        return UserService.getUserById(userId);
      })
      .then(async (user) => {
        if (tempProgram) {
          user.programs.push(tempProgram);
          await getRepository(User).save(user);
          return user;
        }
      });
  }

  public unassignProgramToUser(userId: number, programId: number) {
    let tempProgram: null | Program = null;
    return ProgramService.getProgramById(programId)
      .then((program: Program) => {
        tempProgram = program;
        return UserService.getUserById(userId);
      })
      .then(async (user) => {
        if (tempProgram) {
          user.programs = user.programs.filter((program) => {
            return program.id !== programId;
          });
          await getRepository(User).save(user);
          return user;
        }
      });
  }
}
