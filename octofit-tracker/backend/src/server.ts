import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import activitiesRouter from './routes/activities.js';

dotenv.config();

const PORT = process.env.PORT ?? 8000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit';

const app = express();
app.use(express.json());

// API routes
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
