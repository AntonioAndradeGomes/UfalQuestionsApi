import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import User from "./User";

@Entity("perguntas")
class Pergunta {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: "text"})
  titulo: string;

  //partindo desse model para o model de usuario
  //quantos usuarios fizeram essa pergunta? um
  @ManyToOne(type => User, perguntas => Pergunta, {onDelete: "CASCADE", onUpdate: "CASCADE",  nullable: false})
  user: User;

  @Column({type: "text"})
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pergunta;
