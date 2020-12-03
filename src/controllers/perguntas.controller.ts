import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Pergunta from "../models/Pergunta";

class PerguntasController {
  public async readAll(req: Request, res: Response) {
    return res.json(await getRepository(Pergunta).find());
  }

  public async readOnly(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    const resposta = await perguntaRepository.findOne({
      where: { id: req.params.id },
    });
    return res.json(resposta);
  }

  // TODO : verificar se id do usuario coresponde a um usuario logado
  public async insert(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    const { titulo, descricao } = req.body;
    //console.log(req.user);
    const pergunta = perguntaRepository.create({
      titulo,
      descricao,
      user_id: req.user.id,
    });
    await perguntaRepository.save(pergunta);
    return res.status(201).json(pergunta);
  }

  public async delete(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    let perguntaRemover = await perguntaRepository.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!perguntaRemover) {
      console.log("Pergunta não existe");
      throw new AppError("Pergunta não existe");
      //return res.status(400).json({ erro: "Pergunta não existente" });
    } else {
      await perguntaRepository.remove(perguntaRemover);
      return res.json({ message: "Pergunta removida com sucesso!" });
    }
  }

  public async update(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    let perguntaAtualizar = await perguntaRepository.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!perguntaAtualizar) {
      console.log("Pergunta não existe");
      throw new AppError("Pergunta não existe");
      //return res.status(400).json({ erro: "Pergunta não existente" });
    } else {
      await perguntaRepository.update(req.params.id, req.body);
      return res.json(
        await perguntaRepository.findOne({
          where: { id: req.params.id },
        })
      );
    }
  }
}

export default PerguntasController;
