import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Pergunta from "../models/Pergunta";
import User from "../models/User";

interface Request{
  titulo: string;
  descricao: string;
  userId: string;
}

export default class PerguntaService{
  public async executeCreate({titulo, descricao, userId} : Request) : Promise<Pergunta>{
    const userRepository = getRepository(User);
    const perguntaRepository = getRepository(Pergunta);

    const userLogado = await userRepository.findOne({
      where: {id: userId}
    });

    if(!userLogado){
      throw new AppError('Error finding the logged in user');
    }

    if(!titulo || titulo.length == 0){
      throw new AppError('Question must have title');
    }

    if(!descricao || descricao.length == 0){
      throw new AppError('Question must have description');
    }

    const pergunta = perguntaRepository.create({
      titulo,
      descricao,
      user: userLogado
    });

    await perguntaRepository.save(pergunta);

    return pergunta;
  }
}
