import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow cookies and authentication headers
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
