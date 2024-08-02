import { IUser } from '../models/user'; // Adjust the path according to your project structure

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
