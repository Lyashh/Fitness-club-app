import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from "typeorm";
import User from "./user.entity";
import Exercise from "./exsercise.entity";

@Entity()
class Program {
  @PrimaryGeneratedColumn("uuid")
  public id: number;

  @Column()
  public name: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date;

  @ManyToMany(() => User, (user: User) => user.programs)
  public users: User[];

  @ManyToMany((type) => Exercise, (exercise: Exercise) => exercise.programs)
  @JoinTable()
  exercises: Exercise[];
}

export default Program;
