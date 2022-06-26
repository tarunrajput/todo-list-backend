import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  desc: {
    type: String,
    required: [true, "Todo item can't be empty"],
    trim: true,
  },
  created: {
    type: String,
    default: String(new Date()),
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('Todo', todoSchema);
