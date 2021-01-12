import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Resposta from "../models/Resposta";
import Pergunta from "../models/Pergunta";

export default class RespostasController {
  public async readonly(req: Request, res: Response) {
    return res.json(
      await getRepository(Resposta).find({
        where: {
          pergunta: await getRepository(Pergunta).findOne({
            where:{id: req.params.idPergunta},
          }),
        },
        relations : ['user'],
      })
    );
  }


}
