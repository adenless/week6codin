import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { unknownEndpoint, errorHandler } from './middleware/customMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js'; // Import jobRouter

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to the database
connectDB();

// Use the userRouter for all /api/users routes
app.use('/api/users', userRouter);

// Use the jobRouter for all /api/jobs routes
app.use('/api/jobs', jobRouter);

// Custom middleware for unknown endpoints and error handling
app.use(unknownEndpoint);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});