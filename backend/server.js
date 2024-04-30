import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDb.js';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import enrollRoutes from './routes/enroll.routes.js';
import { verifyToken } from './utils/jwtVerify.js';

import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const PORT = process.env.PORT || 7895;
const app = express();

app.use(cors({
    origin: 'http://192.168.1.3:5173',
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/course', courseRoutes);
app.use('/enroll',verifyToken, enrollRoutes);


app.use('/',(req,res)=>{
    res.send('server running')
})
app.listen(PORT,()=>{
    connectToMongoDB()
    console.log('Server is running at http://localhost:' + PORT);
})