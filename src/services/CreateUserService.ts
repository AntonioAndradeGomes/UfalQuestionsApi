import User from "../models/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";


interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    if(!name || name.length == 0){
      throw new Error("User must contain name.");
    }

    //não criar um usuario com email duplicado
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new Error("Email address already used.");
    }

    if(password.length < 6){
      throw new Error("Weak password.");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password : hashedPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
