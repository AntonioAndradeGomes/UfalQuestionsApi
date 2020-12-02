import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import {sign} from 'jsonwebtoken'
import User from "../models/User";
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface UserRetorno{
  id: string;
  email: string;
  name: string;
  created_at : Date;
  updated_at : Date;
  avatar : string;
}

interface Request {
  email: string;
  password: string;
}

interface Response{
  user: UserRetorno;
  token: string;
}

class AuthenticateUserService {


  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if(!user){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination.',401);
    }

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const userRetorno = {
      id: user.id,
      name: user.nome,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar
    };


    return {
      user : userRetorno,
      token
    };

  }
}

export default AuthenticateUserService;
