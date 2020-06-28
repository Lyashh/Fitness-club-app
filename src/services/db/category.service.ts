import { getRepository } from "typeorm";
import Category from "../../db/entity/category.entity";

export default class CategoryService {
  public static getCategoryById(id: number) {
    return getRepository(Category).findOne(id);
  }

  public static async createCategory(name: string) {
    let category = new Category();
    category.name = name;
    const newCategory = getRepository(Category).create(category);
    await getRepository(Category).save(newCategory);
    return newCategory;
  }
}
