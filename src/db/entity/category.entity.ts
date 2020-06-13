import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Exercise from "./exsercise.entity";

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public name: string;

  @OneToMany(() => Exercise, (exercise: Exercise) => exercise.category)
  public exercises: Exercise[];
}

export default Category;
