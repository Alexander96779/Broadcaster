import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import auth from '../authorization/auth';

const app = express();

app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);
app.post('/api/v1/entry', auth, entryController.createEntry);
app.get('/api/v1/entries', auth, entryController.viewAll);
app.get('/api/v1/entries/:entryId', auth, entryController.viewSpecific);
app.patch('/api/v1/entries/:entryId/Location', auth, entryController.updateEntry);
export default app;
