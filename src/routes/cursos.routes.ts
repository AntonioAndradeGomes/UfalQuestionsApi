import { Router } from "express";
import { getRepository } from "typeorm";
import Curso from "../models/Curso";

const cursosRouter = Router();

cursosRouter.get("/", async (request, response) => {
  try {
    return response.json(await getRepository(Curso).find());
  } catch (e) {
    console.log(e);
    return response.status(400).json({ erro: e.message });
  }
});

cursosRouter.get("/:id", async (request, response) => {
  try {
    return response.json(
      await getRepository(Curso).findOne({
        where: { id: parseInt(request.params.id) },
      })
    );
  } catch (e) {
    console.log(e);
    return response.status(400).json({ erro: e.message });
  }
});

export default cursosRouter;
