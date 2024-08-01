import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Admin';
  isVerified: boolean;
  verifyToken: string;
  verifyTokenExpire: Date;
  avatar?: string;
  isActive: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  getVerifyToken: () => string;
  _id: mongoose.Types.ObjectId;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    match: [/\S+@lnmiit.ac.in$/, 'Please enter a valid institute email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['Student', 'Admin'],
    default: 'Student',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpire: Date,
  avatar: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// Encrypt password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password with hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash email verification token
userSchema.methods.getVerifyToken = function () {
  const verifyToken = crypto.randomBytes(20).toString('hex');

  this.verifyToken = crypto.createHash('sha256').update(verifyToken).digest('hex');
  this.verifyTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return verifyToken;
};

const User: Model<IUser> = mongoose.model('User', userSchema);

export default User;
export { IUser };
