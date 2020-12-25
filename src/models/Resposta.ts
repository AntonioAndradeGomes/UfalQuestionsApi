import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import Pergunta from "./Pergunta";
import User from "./User";

@Entity("respostas")
export default class Resposta {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  textoResposta: string;

  @ManyToOne(type => Pergunta, respostas => Resposta, {onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false})
  pergunta: Pergunta;

  @ManyToOne(type => User, respostas => Resposta, {onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false})
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
