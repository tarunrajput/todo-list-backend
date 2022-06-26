import auth from '../routes/auth.js';
import todo from '../routes/todo.js';
import httpError from '../middleware/httpError.js';

export default app => {
  app.use('/', auth);
  app.use('/api/todo', todo);
  app.use((req, res, next) => res.status(404).send('Not found'));
  app.use(httpError);
};
