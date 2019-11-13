import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import auth from '../authorization/auth';

const app = express();

app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);
app.post('/api/v1/entry', auth, entryController.createEntry);

export default app;
