import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;

  if (!email.endsWith('@lnmiit.ac.in')) {
    return next(new ErrorHandler('Only institute emails ending with @lnmiit.ac.in are acceptable', 400));
  }

  next();
};
