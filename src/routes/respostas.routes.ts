import {Router} from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import RespostaService from '../services/RespostaService';
const respostasRouter = Router();

respostasRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {textoResposta, perguntaId} = request.body;
  const respostaService = new RespostaService();

  const resposta = await respostaService.executeCreate({
    perguntaId,
    textoResposta,
    userId: request.user.id
  });

  const respostaRetorno = {
    id: resposta.id,
    textoResposta: resposta.textoResposta,
    created_at: resposta.created_at,
    updated_at : resposta.updated_at,
    pergunta: resposta.pergunta,
  }

  return response.status(201).json(respostaRetorno);
});

export default respostasRouter;
