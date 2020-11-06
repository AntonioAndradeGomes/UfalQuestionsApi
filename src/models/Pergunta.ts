import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity("perguntas")
class Pergunta {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  titulo: string;

  @Column()
  user_id: string;

  //partindo desse model para o model de usuario
  //quantos usuarios fizeram essa pergunta? um

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pergunta;
