import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";
import Campus from "./Campus";

@Entity("cursos")
class Curso {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  codigo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => User, curso => Curso)
  users: User[];

  @ManyToOne(type => Campus, cursos => Curso, {eager: true, onDelete: "CASCADE",onUpdate: "CASCADE", nullable: false})
  campus: Campus;
}

export default Curso;
