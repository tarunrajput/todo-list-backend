import express from 'express';
import Logger from './lib/logging.js'

const app = express();

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => 
	Logger.debug(`Server is up and running at http://localhost:${PORT}`)
);