import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/Contacts";
import { AppError } from "../errors/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/Users";
import { Icontacts } from "../interfaces/Contacts";

class ContactVerifyMiddleware {
  async authContact(req: Request, res: Response, next: NextFunction) {
    const userRepo = AppDataSource.getRepository(User);
    const contactRepo = AppDataSource.getRepository(Contact);
    

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
        const id = decoded.sub as string
        const user = await userRepo.findOneBy({ id });
        const contact = (await contactRepo.findOneBy({
          user: { id },
        })) as Contact;

       

        if (contact?.email) {
          throw new AppError("email already exists", 409);
        }

        return next();
      }
    );
  }

  async authContactPatchDelete(req: Request, res: Response, next: NextFunction) {
    const userRepo = AppDataSource.getRepository(User);
    const contactRepo = AppDataSource.getRepository(Contact);
    const body = req.body as Icontacts

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
        const id = decoded.sub as string
        const user = await userRepo.findOneBy({ id });
        const contact = (await contactRepo.findOneBy({
          user: {id}
        })) as Contact;
        const email = await contactRepo.exist({where: {email: body.email}});
     

        if (email) {
          throw new AppError("Email already exists", 409);
        }

        return next();
      }
    );
  }
}

export default new ContactVerifyMiddleware();
