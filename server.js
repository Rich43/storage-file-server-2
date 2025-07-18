import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/media', mediaRoutes); // Add media routes

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
