import { Response } from 'express';
import { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface TokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}

const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

const accessTokenOptions: TokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const refreshTokenOptions: TokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });

  res.cookie('access_token', accessToken, accessTokenOptions);
  res.cookie('refresh_token', refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
