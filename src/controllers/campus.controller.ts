import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Campus from "../models/Campus";

export default class CampusController {
  public async readAll(req: Request, res: Response) {
    return res.json(await getRepository(Campus).find());
  }

  public async readOnly(req: Request, res: Response) {
    const campusRepository = getRepository(Campus);
    const resposta = await campusRepository.findOne({
      where: { id: req.params.id },
    });
    return res.json(resposta);
  }

  //TODO : quando a estrategia do adimin estiver pronta adicionar uma verificação
  //do titulo e da localidade para as rotas abaixo
  public async insert(req: Request, res: Response) {
    const campusRepository = getRepository(Campus);
    const { nome, localidade } = req.body;
    const campus = campusRepository.create({
      nome,
      localidade,
    });
    await campusRepository.save(campus);
    return res.status(201).json(campus);
  }

  public async update(req: Request, res: Response) {
    const campusRepository = getRepository(Campus);
    let campusAtualizar = await campusRepository.findOne({
      where: { id: req.params.id },
    });
    if (!campusAtualizar) {
      throw new AppError("Campus to be updated does not exist.");
    } else {
      await campusRepository.update(req.params.id, req.body);
      return res.json(
        await campusRepository.findOne({
          where: { id: req.params.id },
        })
      );
    }
  }
}
