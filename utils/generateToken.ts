import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const accessTokenOptions = {
  expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
};

export const refreshTokenOptions = {
  expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
};

export const generateAccessToken = (user: IUser): string => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, accessTokenOptions);
};

export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, refreshTokenOptions);
};

export const sendToken = (user: IUser, statusCode: number, res: Response, sessionId?: string) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(statusCode).json({
    success: true,
    accessToken,
    refreshToken,
    sessionId,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
