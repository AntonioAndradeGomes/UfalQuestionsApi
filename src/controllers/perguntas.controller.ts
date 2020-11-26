import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Pergunta from "../models/Pergunta";

class PerguntasController {

  public async readAll(req: Request, res: Response){
    try {
      return res.json(await getRepository(Pergunta).find());
    } catch (e) {
      console.log(e);
      return res.status(400).json({ erro: e.message});
    }
  }

  public async readOnly(req: Request, res: Response){
    try {
      const perguntaRepository = getRepository(Pergunta);
      const resposta = await perguntaRepository.findOne({
        where: { id: req.params.id },
      });
      return res.json(resposta);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ erro: e.message});
    }
  }

  // TODO : verificar se id do usuario coresponde a um usuario logado
  public async insert(req: Request, res: Response) {
    try {
      const perguntaRepository = getRepository(Pergunta);
      const { titulo, descricao } = req.body;
      console.log(req.user);
      const pergunta = perguntaRepository.create({
        titulo,
        descricao,
        user_id: req.user.id,
      });
      await perguntaRepository.save(pergunta);
      return res.status(201).json(pergunta);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ erro: e.message});
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const perguntaRepository = getRepository(Pergunta);
      let perguntaRemover = await perguntaRepository.findOne({
        where: { id: req.params.id, user_id: req.user.id },
      });
      if (!perguntaRemover) {
        console.log("Pergunta não existe");
        return res.status(400).json({ erro: "Pergunta não existente" });
      } else {
        await perguntaRepository.remove(perguntaRemover);
        return res.json({ message: "Pergunta removida com sucesso!" });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ erro: e.message });
    }
  }

  public async update(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    let perguntaAtualizar = await perguntaRepository.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!perguntaAtualizar) {
      console.log("Pergunta não existe");
      return res.status(400).json({ erro: "Pergunta não existente" });
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
