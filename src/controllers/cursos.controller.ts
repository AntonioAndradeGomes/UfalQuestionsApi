import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Curso from "../models/Curso";

export default class CursosController {
  public async readAll(req: Request, res: Response) {
    return res.json(await getRepository(Curso).find());
  }

  public async readonly(req: Request, res: Response) {
    return res.json(
      await getRepository(Curso).findOne({
        where: { id: parseInt(req.params.id) },
      })
    );
  }
}
