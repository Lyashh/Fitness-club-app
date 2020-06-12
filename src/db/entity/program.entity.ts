import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import User from "./user.entity";
import Exercise from "./exsercise.entity";

@Entity()
class Program {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @CreateDateColumn({ type: "timestamp", select: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", select: false })
  public updatedAt: Date;

  @ManyToMany(() => User, (user: User) => user.programs)
  public users: User[];

  @ManyToOne(() => User, (user: User) => user.coachPrograms, {
    nullable: false,
  })
  public coach: User;

  @ManyToMany((type) => Exercise, (exercise: Exercise) => exercise.programs)
  @JoinTable()
  exercises: Exercise[];
}

export default Program;
