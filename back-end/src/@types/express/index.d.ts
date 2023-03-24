import { User } from "../../entities/Users";

declare global {
  namespace Express {
    interface Request {
      indexUser: User;
    }
  }
}

export {};
