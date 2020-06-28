import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import RoleService from "./role.service";
import ProgramService from "./program.service";
import User from "../../db/entity/user.entity";
import Program from "../../db/entity/program.entity";

export default class UserService {
  public static getUserById(id: number, programs: boolean) {
    let relations = ["role"];
    if (programs) {
      relations.push(
        "programs",
        "coachPrograms"
        /* "programs.exercises",
        "programs.exercises.category",
        "coachPrograms.exercises",
        "coachPrograms.exercises.category" */
      );
    }
    return getRepository(User)
      .findOne(id, {
        select: ["age", "name", "email", "id"],
        relations,
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

  public static getAthletes() {
    return getRepository(User)
      .createQueryBuilder("user")
      .select(["user.age", "user.name", "user.id", "user.email"])
      .innerJoinAndSelect("user.role", "role", "role.name = :roleName", {
        roleName: "athlete",
      })
      .orderBy("user.name", "ASC")
      .getMany()

      .then((users) => {
        if (users) {
          return users;
        }
        return Promise.reject({
          httpStatus: 404,
          message: `Role with name: athlete not found`,
        });
      });
  }

  public static getUserByEmail(email: string) {
    return getRepository(User).findOne({
      where: { email },
      select: ["id", "name", "email", "password", "age"],
      relations: ["role"],
    });
  }

  public static createUser(
    userReq: any,
    reqRole: "athlete" | "coach" = "athlete"
  ): Promise<User> {
    return RoleService.getByRolesName(reqRole).then(async (role) => {
      if (role) {
        const hash = await bcrypt.hash(userReq.password, 10);

        let user = new User();
        user.name = userReq.name;
        user.age = userReq.age;
        user.email = userReq.email;
        user.password = hash;
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
        return this.getUserById(id, false);
      });
  }

  public static assignProgramToUser(
    userId: number,
    programId: number,
    coachId: number
  ) {
    let tempProgram: null | Program = null;
    return ProgramService.getProgramById(programId)
      .then((program: Program) => {
        tempProgram = program;
        return UserService.getUserById(userId, true);
      })
      .then(async (user) => {
        if (tempProgram) {
          user.programs.push(tempProgram);
          await getRepository(User).save(user);
          return UserService.userOneCoachPrograms(userId, coachId);
        }
      });
  }

  public static unassignProgramToUser(
    userId: number,
    programId: number,
    coachId: number
  ) {
    let tempProgram: null | Program = null;
    return ProgramService.getProgramById(programId)
      .then((program: Program) => {
        tempProgram = program;
        return UserService.getUserById(userId, true);
      })
      .then(async (user) => {
        if (tempProgram) {
          user.programs = user.programs.filter((program) => {
            return program.id !== programId;
          });
          await getRepository(User).save(user);
          user.programs = user.programs.filter((pr) => {
            return { id: pr.id, name: pr.name };
          });
          return UserService.userOneCoachPrograms(userId, coachId);
        }
      });
  }

  public static getUsersByPrograms(userId: number) {
    return UserService.getUserById(userId, true).then((user) => {
      const programsIds = user.coachPrograms.map((program) => {
        return program.id;
      });
      if (programsIds.length > 0) {
        return getRepository(User)
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.programs", "program")
          .where("program.id IN (:...programsIds)", {
            programsIds,
          })
          .innerJoinAndSelect("user.role", "role", "role.name = :athlete", {
            athlete: "athlete",
          })
          .orderBy("user.name", "ASC")
          .getMany();
      }
      return Promise.resolve([]);
    });
  }

  public static async userOneCoachPrograms(userId: number, coachId: number) {
    return getRepository(User)
      .createQueryBuilder("user")
      .select(["user.age", "user.email", "user.name", "user.id"])
      .leftJoinAndSelect("user.programs", "program")
      .innerJoinAndSelect(
        "program.coach",
        "user.coachPrograms",
        "program.coach.id = :cid",
        { cid: coachId }
      )
      .leftJoinAndSelect("user.role", "role")
      .where("user.id = :id", { id: userId })
      .getOne()
      .then(async (user) => {
        if (user) {
          return user;
        }
        const emptyProgramsUser = await UserService.getUserById(userId, false);
        if (emptyProgramsUser) {
          emptyProgramsUser.programs = [];
          return emptyProgramsUser;
        }
      });
  }
}
