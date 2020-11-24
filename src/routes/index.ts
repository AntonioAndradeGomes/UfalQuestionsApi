//arquivo principal das rotas
import { Router } from "express";
import perguntasRouter from "./perguntas.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/perguntas", perguntasRouter);
routes.use("/users", usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
