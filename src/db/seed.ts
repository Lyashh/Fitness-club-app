import { createQueryBuilder, getRepository } from "typeorm";
import RoleService from "../services/db/role.service";
import UserService from "../services/db/user.service";
import Role from "./entity/role.entity";
import User from "./entity/user.entity";
import CategoryService from "../services/db/category.service";
import ExerciseService from "../services/db/exercise.service";

const seed = async () => {
  try {
    /* ROLES */
    const roles = [{ name: "athlete" }, { name: "coach" }];
    await Promise.all(
      roles.map((role) => {
        return RoleService.createRole(role.name);
      })
    );

    /* COACHES */
    const coaches = [
      {
        name: "Coach1 Name",
        email: "coach1@gmail.com",
        age: 30,
        password: "password",
      },
      {
        name: "Coach2 Name",
        email: "coach2@gmail.com",
        age: 60,
        password: "password",
      },
    ];
    await Promise.all(
      coaches.map((coach) => {
        return UserService.createUser(coach, "coach");
      })
    );

    /* ATHLETES */

    const athletes = [
      {
        name: "Athlete 1 Name",
        email: "athlete1@gmail.com",
        age: 34,
        password: "password",
      },
      {
        name: "Athlete 2 Name",
        email: "athlete2@gmail.com",
        age: 18,
        password: "password",
      },
      {
        name: "Athlete 3 Name",
        email: "athlete3@gmail.com",
        age: 27,
        password: "password",
      },
      {
        name: "Athlete 4 Name",
        email: "athlete4@gmail.com",
        age: 24,
        password: "password",
      },
    ];

    await Promise.all(
      athletes.map((athlete) => {
        return UserService.createUser(athlete, "athlete");
      })
    );

    /* CATEGORIES */

    const categories = [{ name: "legs" }, { name: "arms" }, { name: "head" }];
    await Promise.all(
      categories.map((category) => {
        return CategoryService.createCategory(category.name);
      })
    );

    /* EXERCISES */
    const exercises = [
      { name: "exercise 1", categoryId: 1, quantity: 30 },
      { name: "exercise 2", categoryId: 3, quantity: 50 },
      { name: "exercise 3", categoryId: 2, quantity: 20 },
      { name: "exercise 4", categoryId: 3, quantity: 11 },
      { name: "exercise 5", categoryId: 3, quantity: 25 },
      { name: "exercise 6", categoryId: 1, quantity: 4 },
      { name: "exercise 7", categoryId: 2, quantity: 50 },
      { name: "exercise 8", categoryId: 1, quantity: 30 },
    ];

    await Promise.all(
      exercises.map((exercise) => {
        return ExerciseService.createExercise(exercise);
      })
    );

    console.log("Seed finished");
  } catch (error) {
    console.log({ error });
  }
};

export default seed;
