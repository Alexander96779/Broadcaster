import express from 'express';
import userController from '../controller/userController';
import validation from '../middleware/validation';


const app = express();

app.post('/api/v2/signup', validation.userSignup, userController.signup);
app.post('/api/v2/signin', validation.userSignin, userController.signin);
export default app;
