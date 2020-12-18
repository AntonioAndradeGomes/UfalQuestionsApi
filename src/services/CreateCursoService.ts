import Curso from "../models/Curso";
import Campus from "../models/Campus";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";


interface Request {
  nome: string;
  codigo: string;
  campusId: string;
}

export default class CreateCursoService{
  public async execute({nome, codigo, campusId} : Request) : Promise<Curso> {
    const cursoRepository = getRepository(Curso);
    const campusRepository = getRepository(Campus);

    const checkCampusExists = await campusRepository.findOne({
      where : {id: campusId}
    });

    if(!checkCampusExists){
      throw new AppError("Past campus does not exist.");
    }


    const checkCursoExists = await cursoRepository.findOne(
      {
        where: {codigo}
      }
    );

    if(checkCursoExists){
      throw new AppError('There is already a course with this code');
    }

    const curso = cursoRepository.create({
      nome,
      codigo,
      campus : checkCampusExists,
    });


    await cursoRepository.save(curso);

    return curso;
  }
}
