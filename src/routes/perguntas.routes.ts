import { Router } from "express";
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import PerguntasController from '../controllers/perguntas.controller';
import PerguntaService from "../services/PerguntaService";

const perguntasRouter = Router();

const perguntasController = new PerguntasController()

perguntasRouter.get("/", perguntasController.readAll)

.post('/', ensureAuthenticated, async (request, response) => {
  const {titulo, descricao} = request.body;

  const createPergunta = new PerguntaService();

  const pergunta = await createPergunta.executeCreate({
    titulo,
    descricao,
    userId : request.user.id
  });

  return response.status(201).json(pergunta);

})

.delete('/:id', ensureAuthenticated, perguntasController.delete)
.put('/:id', ensureAuthenticated, perguntasController.update);


/*
perguntasRouter.delete("/:id", ensureAuthenticated, perguntasController.delete);

perguntasRouter.put("/:id", ensureAuthenticated, perguntasController.update);*/

export default perguntasRouter;
