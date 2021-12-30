
require('dotenv').config();
import { connectDb } from '../';
import seedCharacter from './characters';

async function seedDatabase() {
  const mongoose = await connectDb(process.env.DATABASE_ACCESS as string);

  console.log(`Connected to database: ${mongoose.connection.name}...`);

  await seedCharacter();

  console.log('Finished seeding all collections!');
  process.exit(0);
}

seedDatabase();