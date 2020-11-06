//arquivo principal das rotas
import { Router } from "express";
import perguntasRouter from "./perguntas.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use("/perguntas", perguntasRouter);
routes.use("/users", usersRouter);

export default routes;
