import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import Curso from "./Curso";
import Pergunta from "./Pergunta";
import Resposta from "./Resposta";

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

  @Column({nullable: true})
  avatar: string;

  @ManyToOne(type => Curso, users => User, {eager: true, onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true})
  curso: Curso;

  @OneToMany(type => Pergunta, user => User)
  perguntas: Pergunta[];

  @OneToMany(type => Resposta, user => User)
  respostas: Resposta[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
