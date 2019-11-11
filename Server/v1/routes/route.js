import express from 'express';
import userController from '../controllers/userController';
import auth from '../authorization/auth';

const app = express();

app.post('/api/v1/signup', userController.signup);

export default app;
