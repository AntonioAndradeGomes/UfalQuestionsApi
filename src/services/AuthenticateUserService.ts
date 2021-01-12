import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";
import Curso from "../models/Curso";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User | undefined;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    //coloquei no model o dado de senha como oculto, por isso necessitei dessa busca
    //não consegui trazer o curso junto por isso refiz a busca la em baixo para trazer o curso junto
    const user = await usersRepository.createQueryBuilder('user').select([
      'user.id',
      'user.nome',
      'user.email',
      'user.avatar',
      'user.password',
      'user.curso',
      'user.created_at',
      'user.updated_at'
    ]).where('user.email = :email', {email: email} ).getOne();

    //console.log(user);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });


    const userBuscado = await usersRepository.findOne({ where: { email } });
    return {
      user:  userBuscado,
      token,
    };
  }
}

export default AuthenticateUserService;
