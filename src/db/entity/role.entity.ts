import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import User from "./user.entity";

@Entity()
class Role {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: true })
  public name: string;

  @OneToMany((type) => User, (user: User) => user.role)
  users: User[];
}

export default Role;
