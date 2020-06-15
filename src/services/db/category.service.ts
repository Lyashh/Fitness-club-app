import { getRepository } from "typeorm";
import Category from "../../db/entity/category.entity";

export default class CategoryService {
  public static async getCategoryById(id: number) {
    return getRepository(Category).findOne(id);
  }
}
