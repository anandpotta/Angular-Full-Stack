import { connect, connection } from 'mongoose';

const connectToMongo = async (): Promise<void> => {
  let mongodbURI: string;
  if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI as string;
  } else {
    mongodbURI = process.env.MONGODB_URI as string;
  }
  
  try {
    await connect(mongodbURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 10000,
    });
    console.log(`Connected to MongoDB (db: ${mongodbURI.split('/').pop()})`);
  } catch (error) {
    console.warn('MongoDB connection failed:', error.message);
    console.warn('Running in development mode without database connection');
    console.warn('Some features may not work properly');
    // Don't throw the error - let the app continue running
  }
};

const disconnectMongo = async (): Promise<void> => {
  try {
    await connection.close();
  } catch (error) {
    console.warn('Error disconnecting from MongoDB:', error.message);
  }
};

export { connectToMongo, disconnectMongo };