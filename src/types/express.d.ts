import { User } from "@prisma/client";

export {};

declare global {
  namespace Express {
    export interface Request {
      requestTime?: String;
      user?: User;
    }
  }
}
