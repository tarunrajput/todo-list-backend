import morgan from 'morgan';
import Logger from '../lib/logging.js';
import { isDevelopmentEnv } from '../lib/utils.js';

/**
 * Override the stream method by telling
 * Morgan to use our custom logger instead of the console.log.
 */
const stream = {
  // Use the http severity
  write: message => Logger.http(message),
};

/**
 * Skip all the Morgan http log if the application is not running in development mode.
 * @returns(boolean)
 */
const skip = () => !isDevelopmentEnv();

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;
