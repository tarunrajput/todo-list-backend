import express from 'express';
import { authenticate } from '../config/passport.js';
import {
  getAllTodos,
  addTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} from '../controllers/todo.js';

const router = express.Router();

router.get('/', authenticate, getAllTodos);
router.post('/', authenticate, addTodo);
router.get('/:id', authenticate, getTodoById);
router.patch('/:id', authenticate, updateTodoById);
router.delete('/:id', authenticate, deleteTodoById);

export default router;
