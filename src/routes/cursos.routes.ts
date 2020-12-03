import { Router } from "express";
import { getRepository } from "typeorm";
import Curso from "../models/Curso";

const cursosRouter = Router();

cursosRouter.get("/", async (request, response) => {
  return response.json(await getRepository(Curso).find());
});

cursosRouter.get("/:id", async (request, response) => {
  return response.json(
    await getRepository(Curso).findOne({
      where: { id: parseInt(request.params.id) },
    })
  );
});


export default cursosRouter;
