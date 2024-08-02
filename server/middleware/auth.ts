import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user"; // Adjust the import path if necessary
import User from "../models/user"; // Add this import

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      ); // Changed status code to 401 (Unauthorized)
    }

    try {
      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      if (!decoded) {
        return next(new ErrorHandler("Access token is not valid", 401)); // Changed status code to 401 (Unauthorized)
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404)); // Changed status code to 404 (Not Found)
      }

      req.user = user;

      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid token", 401)); // Changed status code to 401 (Unauthorized)
    }
  }
);

export const isAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new ErrorHandler("User not found", 404)); // Changed status code to 404 (Not Found)
    }

    if (user.role !== 'Admin') {
      return next(new ErrorHandler("Access denied. Admins only", 403)); // Changed status code to 403 (Forbidden)
    }

    next();
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      ); // Changed status code to 403 (Forbidden)
    }

    next();
  };
};
