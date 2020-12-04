import User from "../models/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from '../errors/AppError';
import Curso from "../models/Curso";


interface Request {
  nome: string;
  email: string;
  password: string;
  cursoId: string;
}

class CreateUserService {
  public async execute({ nome, email, password, cursoId }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const cursoRepository = getRepository(Curso);

    if(!nome || nome.length == 0){
      throw new AppError("User must contain name.");
    }

    //não criar um usuario com email duplicado
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new AppError("Email address already used.");
    }

    if(password.length < 6){
      throw new AppError("Weak password.");
    }

    if(!cursoId){
      throw new AppError("Pass the course data to the user.");
    }

    const checkCursoExists = await cursoRepository.findOne({
      where: {id: cursoId}
    });

    if(!checkCursoExists){
      throw new AppError("A course has been passed that does not exist.");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      nome,
      email,
      password : hashedPassword,
      curso: checkCursoExists
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
