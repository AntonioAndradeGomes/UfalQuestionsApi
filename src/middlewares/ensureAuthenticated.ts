import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload{
  iat : number,
  exp : number,
  sub: string,
}

export default function ensureAuthenticated(request : Request, response : Response, next : NextFunction) : void{
  //validação do token jwt
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new Error('JWT token is missing');
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
  }catch(err){
    throw new Error('Invalid JWT token');
  }

}