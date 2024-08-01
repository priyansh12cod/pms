import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/user";
import sendMail from "../utils/emailSender";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from 'axios';
import { sendToken } from "../utils/generateToken";

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword, userType, captcha } = req.body;

    // Log the CAPTCHA response for debugging
    console.log('CAPTCHA Response:', captcha);

    // Validate email domain
    if (!email.endsWith("@lnmiit.ac.in")) {
      return next(new ErrorHandler("Invalid email domain", 400));
    }

    // Validate passwords
    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    // Validate CAPTCHA
    if (!captcha) {
      return next(new ErrorHandler("CAPTCHA verification failed", 400));
    }

    // Verify CAPTCHA token
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      if (!secretKey) {
        return next(new ErrorHandler("CAPTCHA secret key not set", 500));
      }

      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: secretKey,
          response: captcha
        }
      });

      console.log('ReCAPTCHA Verification Response:', response.data); // For debugging
      if (!response.data.success) {
        return next(new ErrorHandler("CAPTCHA verification failed", 400));
      }
    } catch (error) {
      console.error('CAPTCHA Verification Error:', error); // For debugging
      return next(new ErrorHandler("CAPTCHA verification failed", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword, userType });

    // Create and send activation token
    const activationToken = jwt.sign({ id: user._id }, process.env.ACTIVATION_TOKEN_SECRET as string, { expiresIn: "1h" });
    const activationUrl = `${process.env.CLIENT_URL}/activate/${activationToken}`;
    await sendMail({
      email: user.email,
      subject: "Activate Your Account",
      template: "verifyEmail.ejs",
      data: { name: user.name, activationUrl }
    });

    res.status(201).json({
      success: true,
      message: "Registration successful! Please check your email to activate your account."
    });
  }
);



// Activate user
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activationToken } = req.params;

    try {
      const decoded: any = jwt.verify(
        activationToken,
        process.env.ACTIVATION_TOKEN_SECRET as string
      );

      await User.findByIdAndUpdate(decoded.id, { isActive: true });

      res.status(200).json({
        success: true,
        message: "Account activated successfully! You can now log in.",
      });
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired activation token", 400));
    }
  }
);


// Login user
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (!user.isActive) {
      return next(new ErrorHandler("Account is not activated", 403));
    }

    sendToken(user, 200, res);
  }
);

// Logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
);

// Update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return next(new ErrorHandler("No refresh token found", 401));
    }

    try {
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as jwt.JwtPayload;

      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler("Invalid refresh token", 401));
    }
  }
);
