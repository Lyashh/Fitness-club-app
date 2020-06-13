import { getRepository } from "typeorm";
import Role from "../../db/entity/role.entity";

export default class RoleService {
  public static async getRoleById(id: number) {
    return getRepository(Role).findOne(id);
  }
}
