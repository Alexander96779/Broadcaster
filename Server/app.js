import express from 'express';
// import routes from './v1/routes/route';
import route from './v2/routes/routes';

const app = express();
app.use(express.json());
app.use(route);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is up and running on port ${port}!`));

export default app;
