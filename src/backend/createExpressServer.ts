import express, { Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import routes from './routes/routes'

const createExpressServer = (): Express => {
  const app = express();

  app.use(morgan(':status | :method :url :response-time ms | :remote-addr'));

  app.use(cors());
  app.use(compression());

  app.use(express.json())
  app.use(cors())
  app.use('/api', routes)


  app.get('/', (_, res) => res.send('k it works Express + TypeScript Server'));

  return app;
};

export default createExpressServer;