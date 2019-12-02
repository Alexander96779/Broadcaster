import express from 'express';
import userController from '../controller/userController';


const app = express();

app.post('/api/v2/signup', userController.signup);
export default app;
