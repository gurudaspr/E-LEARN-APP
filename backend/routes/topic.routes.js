
 import express from 'express';
 import { viewTopic, addSubTopic,addTopic
 } from '../controllers/topic.controller.js';
import { verifyToken } from '../utils/jwtVerify.js';
import upload from '../middlewares/upload.middleware.js';

 const router = express.Router();
 
 router.post('/add', addTopic);
 router.get('/view' ,viewTopic);
 router.post('/subtopic/add', upload.single('video'), addSubTopic);
 
 export default router;

