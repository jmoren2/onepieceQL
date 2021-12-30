
require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../';
const characterModel = require('../models/character')

export default async function seedClan(): Promise<void> {
  const mongoose = await connectDb(process.env.DATABASE_ACCESS as string);

  console.log('Seeding characters to database:');
  console.log('Removing old data...');
  
  const truncated = await characterModel.deleteMany({});
  console.log('Removed old Character data successfully!');

  const characters: any[] = [];
  const stream = fs.createReadStream(
    path.resolve(process.cwd(), '../scrapers/characters.csv')
  );

  return new Promise<void>((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', character => characters.push(character))
      .on('end', async () => {
        await Promise.all(
          characters.map(async character => {            
            const newCharacter = new characterModel({
              ...character,
              name: character.Name.trim(),
              description: character.Description ? character.Description : 'N/A',
              link: character.Link
            });
            await newCharacter.save();
          })
        );
        console.log('Succesfully seeded Characters!');
        stream.destroy();
        resolve();
      })
      .on('error', () => reject('Seeding Characters failed!'));
  });
}