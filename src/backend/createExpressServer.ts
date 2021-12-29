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
  
  app.get('/', (_, res) => res.send('Hello from /'));
  app.use('/api', routes)

  return app;
};

export default createExpressServer;