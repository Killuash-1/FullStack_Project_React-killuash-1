import { compare } from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/Users";
import { AppError } from "../errors/error";
import { IUserRequest } from "../interfaces/Users";


class UserVerify {

  

  async userExist(req: Request, res: Response, next: NextFunction) {
    const  userRepo = AppDataSource.getRepository(User);
    const user: IUserRequest = req.body;
    console.log(user);
    
    const userExists = await userRepo.findOneBy({email: user.email}) as User
    console.log(userExists);
    
    if (userExists) {
      throw new AppError("User already exists", 409);
    }

    return next();
  }

  async idVerification(req: Request, res: Response, next: NextFunction) {
    const  userRepo = AppDataSource.getRepository(User);
    const { id } = req.params;

    const idVerify = await userRepo.exist({ where: { id: id } });
    if (!idVerify) {
      throw new AppError("id Not found.", 404);
    }
    return next();
  }

  async correctUser(req: Request, res: Response, next: NextFunction) {
    const  userRepo = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const userEmail = (await userRepo.findOne({
      where: { email: email },
    })) as User;
    const passMatch = await compare(password, userEmail.password as string);

    if (!userEmail || !passMatch) {
      throw new AppError("Incorrect Email or Password ", 403);
    }
    return next();
  }

  async tokenValidation(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Missing token.", 401);
    }

    const token = authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (error, decoded) => {
        if (error) {
          return res.json(error.message);
        }
      }
    );

    return next();
  }

  async verifyPatchBody(req: Request, res: Response, next: NextFunction) {
    const verifyInfo = Object.keys(req.body);

    if (verifyInfo.includes("id")) {
      throw new AppError("These data cannot be modified ", 401);
    }

    return next();
  }

  async verifyPatchAndDelete(req: Request, res: Response, next: NextFunction) {
    let authToken = req.headers.authorization;
    const token = authToken!.split(" ")[1];

    const { sub } = jwt.decode(token) as JwtPayload;

    if (sub !== req.params.id) {
      throw new AppError("id invalid.", 401);
    }

    return next();
  }
}

export default new UserVerify();