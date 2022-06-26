import winston from 'winston';
import { isDevelopmentEnv } from './utils.js';
import { LOG_LEVELS, LOG_LEVEL_COLORS } from './constants.js';

/**
 * Set the logging severity based on environment.
 * Show all log levels in development.
 * Show only error and warns messages in production.
 */
const level = () => (isDevelopmentEnv ? 'debug' : 'warn');

// Add Colors to winston based on log severity levels
winston.addColors(LOG_LEVEL_COLORS);

// Customizes the log format.
const format = winston.format.combine(
  // Add the timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),

  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),

  winston.format.errors({ stack: true }),

  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      // print log trace
      return `${timestamp} ${level}: ${message} - ${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
  })
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),

  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),

  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winston.transports.File({ filename: 'logs/all.log' }),
];

// Create the logger instance.
const Logger = winston.createLogger({
  level: level(),
  levels: LOG_LEVELS,
  format,
  transports,
});

export default Logger;
