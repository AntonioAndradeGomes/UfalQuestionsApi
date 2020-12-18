import { Router } from "express";
import { getRepository } from "typeorm";
import CursosController from "../controllers/cursos.controller";
import Curso from "../models/Curso";
import CreateCursoService from "../services/CreateCursoService";

const cursosRouter = Router();

const cursosController = new CursosController();

cursosRouter.get("/", cursosController.readAll);

cursosRouter.get("/:id", cursosController.readonly);

cursosRouter.post("/", async (request, response) => {
  const { nome, codigo, campusId } = request.body;

  const createCurso = new CreateCursoService();


  const curso = await createCurso.execute({
    nome,
    codigo,
    campusId,
  });

  return response.status(201).json(curso);
});

export default cursosRouter;
