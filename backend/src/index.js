import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import photoRoutes from './routes/photoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.get('/api/message', (req, res) => {
  res.send('hello this is from backend.');
});

app.use('/api/photos', photoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(4000, () => {
  console.log(`listening on 4000`);
});
