import { getRepository } from "typeorm";
import Role from "../../db/entity/role.entity";

export default class RoleService {
  public static async getRoleById(id: number) {
    return getRepository(Role).findOne(id);
  }

  public static async getByRolesName(name: "athlete" | "coach") {
    return getRepository(Role).findOne({
      where: {
        name,
      },
    });
  }

  public static async createRole(name: string) {
    let role = new Role();
    role.name = name;
    const newRole = getRepository(Role).create(role);
    await getRepository(Role).save(newRole);
    return newRole;
  }
}
