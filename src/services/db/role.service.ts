import { getRepository } from "typeorm";
import Role from "../../db/entity/role.entity";

export default class RoleService {
  private roleRepository = getRepository(Role);

  public async getRoleById(id: number) {
    return this.roleRepository
      .findOne(id)
      .then((role) => role)
      .catch((e) => e);
  }
}
