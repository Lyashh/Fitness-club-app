import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";

import Role from "./role.entity";
import Program from "./program.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  public id: number;

  @Column()
  public name: string;

  @Column("int")
  public age: number;

  @Column({ unique: true, nullable: true })
  public email: string;

  @Column({ nullable: true })
  public password: string;

  @ManyToOne(() => Role, (role: Role) => role.users)
  public role: Role;

  @OneToMany(() => Program, (program: Program) => program.coach)
  coachPrograms: Program[];

  @ManyToMany(() => Program, (program: Program) => program.users)
  @JoinTable()
  programs: Program[];

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date;
}

export default User;
