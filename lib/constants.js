/**
 * Defines log severity levels.
 * With them, You can create log files,
 * see or hide levels based on the running ENV.
 */

export const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/**
 * Define different colors for each log level.
 */
export const LOG_LEVEL_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

export const RESPONSE_HEADER_TOKEN = 'authorization';
