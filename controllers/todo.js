import mongoose from 'mongoose';
import { getResponseFormat, getResponseErrorFormat, sendError } from '../lib/utils.js';
import Todo from '../models/todo.js';
import Logger from '../lib/logging.js';

export const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      sendError(res, `Invalid Id: ${id}`, 404);
    }
    const todo = await Todo.findOne({
      _id: id,
      user: req?.user._id,
    });
    if (!todo) {
      sendError(res, `Todo Not found with Id: ${id}`, 404);
    }
    return res.send(getResponseFormat({ todo }));
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().where({
      user: req?.user?._id,
    });
    return res.send(getResponseFormat({ todos }));
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};

export const addTodo = async (req, res) => {
  try {
    const user = req?.user?._id;

    const todo = await new Todo({
      ...req.body,
      created: String(new Date()),
      user,
    }).save();
    return res.send(getResponseFormat({ todo }, 'Todo Added'));
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};

export const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      sendError(res, `Invalid Id: ${id}`, 404);
    }
    const { desc, isCompleted } = req.body;
    const dataToUpdate = {};
    if (desc != undefined) dataToUpdate.desc = desc;
    if (isCompleted != undefined) dataToUpdate.isCompleted = isCompleted;

    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        $set: dataToUpdate,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!todo) {
      sendError(res, `Failed to Update Todo: ${id}`, 404);
    }

    return res.send(getResponseFormat({ todo }, 'Updated Todo'));
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};

export const deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      sendError(res, `Invalid Id: ${id}`, 404);
    }
    const todo = await Todo.findOneAndRemove({
      _id: id,
      user: req.user._id,
    });
    if (!todo) {
      sendError(res, `Failed to Delete Todo: ${id}`, 404);
    }
    return res.send(getResponseFormat({ todo }, 'Deleted Todo'));
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};
