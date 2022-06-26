import mongoose from 'mongoose';
import Logger from '../lib/logging.js';

export default async () => {
  const URI = process.env.MONGO_DB_URI;

  try {
    /** Opens Mongoose's connection to MongoDB
     * @param {string} - MongoDB Server URI
     * @param {Object} - mongoose connection options
     * @returns {Promise}
     */
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    Logger.debug(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection.getClient();
  } catch (error) {
    Logger.error(`Mongo DB connection error, error -> ${error.message}`);
    process.exit(1);
  }
};
