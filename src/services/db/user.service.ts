import { getRepository } from "typeorm";
import RoleService from "./role.service";
import User from "../../db/entity/user.entity";

export default class UserService {
  private userRepository = getRepository(User);
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  public getUserById(id: number) {
    return this.userRepository.findOne(id, {
      relations: ["role", "programs"],
    });
  }

  public async getAllUsers() {
    const users = await this.userRepository.find({
      relations: ["role", "programs"],
    });
    return users;
  }

  public createUser(userReq: any): Promise<User> {
    return this.roleService.getRoleById(userReq.roleId).then(async (role) => {
      let user = new User();
      user.name = userReq.name;
      user.age = userReq.age;
      user.email = userReq.email;
      user.password = userReq.password;
      user.role = role;

      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    });
  }

  public async deleteUser(id: number) {
    const deleteResponse = await this.userRepository.delete(id);
    if (deleteResponse.affected === 1) {
      return true;
    }
    return false;
  }

  public updateUser(id: number, updateData: any) {
    return this.userRepository
      .update(id, updateData)
      .then(async (updateResponse) => {
        return this.getUserById(id);
      });
  }
}
