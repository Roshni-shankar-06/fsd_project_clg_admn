import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodInstance = null;

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/college_admission';
    
    // Set a quick 2s timeout to check if external MongoDB is active
    mongoose.set('strictQuery', false);
    
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 2000
      });
      console.log(`[Database] Connected to external MongoDB at ${mongoUri}`);
      return;
    } catch (err) {
      console.warn(`[Database] External MongoDB not detected (${err.message}). Initializing embedded MongoMemoryServer...`);
    }

    // Launch embedded MongoMemoryServer fallback
    mongodInstance = await MongoMemoryServer.create({
      instance: {
        dbName: 'college_admission'
      }
    });
    const memoryUri = mongodInstance.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[Database] Connected to embedded MongoDB at ${memoryUri}`);
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};
