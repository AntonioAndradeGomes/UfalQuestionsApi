import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Pergunta from "../models/Pergunta";

class PerguntasController {
  public async readAll(req: Request, res: Response) {
    return res.json(
      await getRepository(Pergunta).find({
        relations: ["user"],

        order: {
          updated_at: "DESC",
        },
      })
    );
  }

  public async readOnly(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    const resposta = await perguntaRepository.findOne({
      where: { id: req.params.id },
    });
    return res.json(resposta);
  }

  public async delete(req: Request, res: Response) {
    const perguntaRepository = getRepository(Pergunta);
    const pergunta = await perguntaRepository.findOne({
      where: { id: req.params.id },
      relations: ["user"],
    });

    if (!pergunta) {
      throw new AppError("Question does not exist");
    }

    if (pergunta.user.id != req.user.id) {
      throw new AppError("Question does not belong to the User");
    }
    await perguntaRepository.remove(pergunta);
    return res.json({ message: "Question removed successfully!" });
  }

  public async update(req: Request, res: Response){
    const perguntaRepository = getRepository(Pergunta);
    let pergunta = await perguntaRepository.findOne({
      where: { id: req.params.id },
      relations: ["user"],
    });
    if (!pergunta) {
      throw new AppError("Question does not exist");
    }

    if (pergunta.user.id != req.user.id) {
      throw new AppError("Question does not belong to the User");
    }
    await perguntaRepository.update(req.params.id, req.body);
    return res.json(
      await perguntaRepository.findOne({
        where: { id: req.params.id },
      })
    );
  }


}

export default PerguntasController;
