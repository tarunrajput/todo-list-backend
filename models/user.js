import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    minlength: [3, 'First Name should contain at least 3 characters'],
    maxlength: [50, 'First Name cannot be more than 50 characters'],
    required: [true, 'First Name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: [50, 'Last Name cannot be more than 50 characters'],
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    minlength: [8, 'Email should contain at least 8 characters'],
    maxlength: [50, 'Email cannot be more than 50 characters'],
    trim: true,
    unique: true,
    match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Email is Invalid'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
    minlength: [4, 'Password must contain at least 6 characters'],
    maxlength: [12, 'Password cannot be more than 12 characters'],
  },
});

/**
 * Checks if Password matches and is correct
 * @param {string} password - Password to match 
 * @return {Boolean} true if password matches with password in DB, false otherwise.
*/
userSchema.methods.comparePassword = function (password) {
  return this.password === password;
};

export default mongoose.model('User', userSchema);
