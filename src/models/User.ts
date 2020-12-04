import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from "typeorm";
import Curso from "./Curso";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  curso_id: string;

  @ManyToOne(type => Curso, users => User)
  @JoinColumn({name: 'curso_id'})
  curso: Curso;

  //TODO: iniciar o cadastro do usuario com o campo de curso

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
