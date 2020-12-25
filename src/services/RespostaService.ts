import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Pergunta from "../models/Pergunta";
import Resposta from "../models/Resposta";
import User from "../models/User";

interface Request{
  textoResposta: string;
  userId : string;
  perguntaId: string;
}

export default class RespostaService{
  public async executeCreate({textoResposta, userId, perguntaId} : Request) : Promise<Resposta>{
    const userRepository = getRepository(User);
    const perguntaRepository = getRepository(Pergunta);
    const respostaRepository = getRepository(Resposta);

    const userLogado = await userRepository.findOne({
      where: {id: userId}
    });

    if(!userLogado){
      throw new AppError('Error finding the logged in user');
    }

    const perguntaSelecionada = await perguntaRepository.findOne({
      where: {id: perguntaId},
      relations: ['user'],
    });

    if(!perguntaSelecionada){
      throw new AppError('Error finding selected question');
    }

    /*if(perguntaSelecionada.user.id == userLogado.id){
      console.log('Pergunta foi feita pelo usuario');
    }*/

    if(!textoResposta || textoResposta.length == 0){
      throw new AppError('Response must have a text');
    }

    const resposta = respostaRepository.create({
      textoResposta,
      pergunta: perguntaSelecionada,
      user: userLogado
    });

    await respostaRepository.save(resposta);

    return resposta;
  }
}
