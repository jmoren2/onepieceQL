import mongoose from 'mongoose';

const connectDb = (dbString: string) => {
  if (dbString) {
    console.log('Successfully connected to DB!');
    return mongoose.connect(dbString);
  }
  console.error(`no db url provided!!`);
  throw Error('Error conecting to DB');
};

const disconnectDb = () => {
  mongoose.connection.close(function () {
    console.log('DB Connection closed');
    process.exit(0);
  });
};

export { connectDb, disconnectDb };