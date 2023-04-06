import { User } from "../../entities/Users";

declare global {
  namespace Express {
    interface Request {
    user: any;
    }
  }
}

export {};
