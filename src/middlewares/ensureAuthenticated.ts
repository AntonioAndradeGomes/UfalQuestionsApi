import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload{
  iat : number,
  exp : number,
  sub: string,
}

export default function ensureAuthenticated(request : Request, response : Response, next : NextFunction) : void{
  //validação do token jwt
  const authHeader = request.headers.authorization;


  if(!authHeader){
    throw new AppError('JWT token is missing', 401);
  }

  //formato = Bearer token
  const [ ,token] = authHeader.split(' ');
  try{
    const decoded = verify(token, authConfig.jwt.secret);
    console.log(decoded);

    const {sub} = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  }catch{
    //console.log(err);
    throw new AppError('Invalid JWT token', 401);

  }

}
