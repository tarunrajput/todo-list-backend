import express from 'express';
import initializePassport from './config/passport.js';
import connectToDB from './config/connectToDB.js';
import requestConditions from './config/requestConditions.js';
import intializeRoutes from './config/routes.js';
import Logger from './lib/logging.js';

/**
 * Creates an Express application.
 */
const app = express();

connectToDB();
requestConditions(app);
initializePassport(app);
intializeRoutes(app);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => Logger.debug(`Server is up and running at http://localhost:${PORT}`));
