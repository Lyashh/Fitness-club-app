import { getRepository } from "typeorm";
import User from "../../db/entity/user.entity";

export default class UserService {
  private userRepository = getRepository(User);

  public async getUserById(id: number) {
    const user = await this.userRepository.findOne(id, { relations: ["role", "programs"] });
    if (user) {
      return user;
    }
    return null;
  }

  public async getAllUsers() {
    const users = await this.userRepository.find({ relations: ["role", "programs"] });
    return users;
  }

  public async createUser(userData: any) {
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  public async deleteUser(id: number) {
    const deleteResponse = await this.userRepository.delete(id);
    if (deleteResponse.raw[1]) {
      return true;
    }
    return false;
  }

  public async updateUser(id: number, updateData: any) {
    await this.userRepository.update(id, updateData);
    const updatedUser = await this.userRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    } else {
      return null;
    }
  }
}
