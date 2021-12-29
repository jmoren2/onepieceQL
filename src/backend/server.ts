import dotenv from 'dotenv'
import { connectDb, disconnectDb } from './database'
import createExpressServer from './createExpressServer';

dotenv.config()
const PORT = process.env.PORT;
const DB_STRING = process.env.DATABASE_ACCESS;

const start = async () => {
    await connectDb(DB_STRING as string);

    const app = createExpressServer();
  
    app.listen(PORT, () => {
      console.log(`Express server is running at http://localhost:${PORT}`);
    });
  
    process.on('SIGINT', disconnectDb).on('SIGTERM', disconnectDb);
}

start();