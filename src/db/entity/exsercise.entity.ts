import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import Program from "./program.entity";
import Category from "./category.entity";

@Entity()
class Exercise {
  @PrimaryGeneratedColumn("uuid")
  public id: number;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true, type: "int" })
  public quantity: number;

  @ManyToMany(() => Program, (program: Program) => program.exercises)
  public programs: Program[];

  @ManyToOne(() => Category, (category: Category) => category.exercises)
  public category: Category;
}

export default Exercise;
