import express from 'express';
import auth from '../middleware/auth';
import userController from '../controller/userController';
import incidentController from '../controller/incidentController';
import validation from '../middleware/validation';


const app = express();

app.post('/api/v2/signup', validation.userSignup, userController.signup);
app.post('/api/v2/signin', validation.userSignin, userController.signin);
app.post('/api/v2/incident', auth, validation.incidentVal, incidentController.createIncident);
export default app;
