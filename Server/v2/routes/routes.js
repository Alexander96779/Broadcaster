import express from 'express';
import auth from '../middleware/auth';
import userController from '../controller/userController';
import incidentController from '../controller/incidentController';
import adminController from '../controller/adminController';
import validation from '../middleware/validation';


const app = express();

app.post('/api/v2/signup', validation.userSignup, userController.signup);
app.post('/api/v2/signin', validation.userSignin, userController.signin);
app.post('/api/v2/incident', auth, validation.incidentVal, incidentController.createIncident);
app.get('/api/v2/red-flags', auth, incidentController.viewAll);
app.get('/api/v2/red-flag/:incidentid', auth, incidentController.viewSpecific);
app.delete('/api/v2/red-flag/Delete/:incidentid', auth, incidentController.deleteIncident);
app.patch('/api/v2/red-flag/Location/:incidentid', auth, validation.locationVal, incidentController.updateLocation);
app.patch('/api/v2/red-flag/Comment/:incidentid', auth, validation.commentVal, incidentController.updateComment);
app.patch('/api/v2/red-flag/Status/:incidentid', auth, validation.statusVal, adminController.acceptFlag);
app.patch('/api/v2/red-flag/Reject/:incidentid', auth, validation.rejectVal, adminController.rejectFlag);
export default app;
