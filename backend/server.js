import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDb.js';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import enrollRoutes from './routes/enroll.routes.js';
import topicRoutes from './routes/topic.routes.js';


dotenv.config();
const PORT = process.env.PORT || 7895;
const app = express();

app.use(cors({
    origin: 'https://e-learn-app-fe.vercel.app/'
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/course', courseRoutes);
app.use('/enroll', enrollRoutes);
app.use('/topic', topicRoutes);

app.use('/',(req,res)=>{
    res.send('server running')
})
connectToMongoDB()
app.listen(PORT,()=>{
    console.log('Server is running at http://localhost:' + PORT);
})