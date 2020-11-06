import { Router } from "express";
import { getRepository } from "typeorm";
import Pergunta from "../models/Pergunta";

const perguntasRouter = Router();

perguntasRouter.get("/", async (request, response) => {
  try {
    return response.json(await getRepository(Pergunta).find());
  } catch (e) {
    console.log(e);
    return response.status(400).json({ erro: e.message, erroCode: e.code });
  }
});

perguntasRouter.get("/:id", async (request, response) => {
  try {
    const perguntaRepository = getRepository(Pergunta);
    const res = await perguntaRepository.findOne({
      where: { id: request.params.id },
    });
    return response.json(res);
  } catch (e) {
    console.log(e);
    return response.status(400).json({ erro: e.message, erroCode: e.code });
  }
});

perguntasRouter.post("/", async (request, response) => {
  try {
    const perguntaRepository = getRepository(Pergunta);
    const pergunta = perguntaRepository.create(request.body);
    await perguntaRepository.save(pergunta);
    return response.status(201).json(pergunta);
  } catch (e) {
    console.log(e);
    return response.status(400).json({ erro: e.message, erroCode: e.code });
  }
});

perguntasRouter.delete("/:id", async (request, response) => {
  try {
    const perguntaRepository = getRepository(Pergunta);
    let perguntaRemover = await perguntaRepository.findOne({
      where: { id: request.params.id },
    });
    if (!perguntaRemover) {
      console.log("Pergunta não existe");
      return response.status(400).json({ erro: "Pergunta não existente" });
    } else {
      await perguntaRepository.remove(perguntaRemover);
      return response.json({ message: "Pergunta removida com sucesso!" });
    }
  } catch (e) {
    console.log(e);
    return response.status(400).json({ erro: e.message });
  }
});

perguntasRouter.put("/:id", async (request, response) => {
  const perguntaRepository = getRepository(Pergunta);
  let perguntaAtualizar = await perguntaRepository.findOne({
    where: { id: request.params.id },
  });
  if (!perguntaAtualizar) {
    console.log("Pergunta não existe");
    return response.status(400).json({ erro: "Pergunta não existente" });
  } else {
    await perguntaRepository.update(request.params.id, request.body);
    return response.json(
      await perguntaRepository.findOne({
        where: { id: request.params.id },
      })
    );
  }
});

export default perguntasRouter;
