import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user';

interface IProject extends Document {
  projectName: string;
  gitHubRepoLink: string;
  thumbnail: string;
  liveHostedLink?: string;
  techStackUsed?: string;
  user: IUser['_id'];
}

const projectSchema: Schema<IProject> = new Schema({
  projectName: {
    type: String,
    required: [true, 'Please enter the project name'],
  },
  gitHubRepoLink: {
    type: String,
    required: [true, 'Please enter the GitHub repository link'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Please upload a project thumbnail'],
  },
  liveHostedLink: {
    type: String,
  },
  techStackUsed: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Project: Model<IProject> = mongoose.model('Project', projectSchema);

export default Project;
export { IProject };
