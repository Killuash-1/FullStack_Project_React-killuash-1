import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/Contacts";
import { AppError } from "../errors/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/Users";
import { Icontacts } from "../interfaces/Contacts";

class ContactVerifyMiddleware {
  async verfiyId (req: Request, res: Response, next: NextFunction){
    const contactRepo = AppDataSource.getRepository(Contact);
    const id =req.params.id
    const contact = (await contactRepo.exist({where:{id}}));

    if(!contact) throw new AppError("Invalid  id", 404);

    return next()
  }

  async authContact(req: Request, res: Response, next: NextFunction) {
    const contactRepo = AppDataSource.getRepository(Contact);
    const email = req.body.email;

    let token = req.headers.authorization;

    if (!token) {
      throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    return jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (error, decoded: any) => {
        if (error) {
          throw new AppError(error.message, 401);
        }

        const contact = (await contactRepo.findOneBy({
          email: email,
        })) as Contact;

        

        if (contact?.email) {
          throw new AppError("Email already exists", 409);
        }

        return next();
      }
    );
  }


}

export default new ContactVerifyMiddleware();
