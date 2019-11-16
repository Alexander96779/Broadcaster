import express from 'express';
import userController from '../controllers/userController';
import entryController from '../controllers/entryController';
import adminController from '../controllers/adminController';
import auth from '../authorization/auth';

const app = express();

app.post('/api/v1/signup', userController.signup);
app.post('/api/v1/signin', userController.signin);
app.post('/api/v1/entry', auth, entryController.createEntry);
app.get('/api/v1/entries', auth, entryController.viewAll);
app.get('/api/v1/entries/:entryId', auth, entryController.viewSpecific);
app.patch('/api/v1/entries/:entryId/Location', auth, entryController.updateEntry);
app.delete('/api/v1/entries/:entryId/Delete', auth, entryController.deleteEntry);
app.get('/api/v1/users', auth, adminController.viewUsers);
app.get('/api/v1/allEntries', auth, adminController.viewEntries);
app.patch('/api/v1/entries/:entryId/Accept', auth, adminController.acceptEntry);
app.patch('/api/v1/entries/:entryId/Reject', auth, adminController.rejectEntry);
app.patch('/api/v1/entries/:entryId/Resolve', auth, adminController.resolveEntry);
export default app;
