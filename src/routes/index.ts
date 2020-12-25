//arquivo principal das rotas
import { Router } from "express";
import perguntasRouter from "./perguntas.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import cursosRouter from './cursos.routes';
import campusRouter from "./campus.routes";
import respostasRouter from './respostas.routes';

const routes = Router();

routes.use("/perguntas", perguntasRouter);
routes.use("/users", usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/cursos', cursosRouter);
routes.use('/campus', campusRouter);
routes.use('/respostas', respostasRouter);

export default routes;
