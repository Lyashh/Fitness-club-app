import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import User from "./user.entity";

@Entity()
class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  public name: string;

  @OneToMany((type) => User, (user: User) => user.role)
  users: User[];
}

export default Role;
