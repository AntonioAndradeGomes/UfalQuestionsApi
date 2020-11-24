import { Router } from "express";
import { getRepository } from "typeorm";
import Pergunta from "../models/Pergunta";
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import PerguntasController from '../controllers/perguntas.controller';

const perguntasRouter = Router();

const perguntasController = new PerguntasController()

perguntasRouter.get("/", perguntasController.readAll);

perguntasRouter.get("/:id", perguntasController.readOnly);

perguntasRouter.post("/", ensureAuthenticated, perguntasController.insert);

perguntasRouter.delete("/:id", ensureAuthenticated, perguntasController.delete);

perguntasRouter.put("/:id", ensureAuthenticated, perguntasController.update);

export default perguntasRouter;
