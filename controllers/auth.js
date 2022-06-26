import User from '../models/user.js';
import { RESPONSE_HEADER_TOKEN } from '../lib/constants.js';
import { getResponseFormat, getResponseErrorFormat, sendError } from '../lib/utils.js';
import { generateToken } from '../helpers/auth.js';
import Logger from '../lib/logging.js';

/**
 * Login and Validates user using email and password.
 * Returns jwt token on success
 */
export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email }, 'email password');

    if (!user) {
      sendError(res, 'Invalid Email or Password', 401);
    }

    const isPasswordMatch = user.comparePassword(password);

    if (isPasswordMatch) {
      const authorizationToken = generateToken({
        email: user?.email,
        _id: user?._id,
      });

      return res.set(RESPONSE_HEADER_TOKEN, `Bearer ${authorizationToken}`).send(
        getResponseFormat({
          id: user._id,
          email: user.email,
          authorizationToken,
        })
      );
    }

    sendError(res, 'Invalid Email or Password', 401);
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};

/**
 * Registers user into DB
 * Returns userInfo and jwt token on success
 */
export const register = async (req, res) => {
  try {
    const { body = {} } = req;
    const { email } = body;
    let user = await User.findOne({ email });

    if (user) {
      sendError(res, 'Email already exists', 409);
    }

    user = new User(body);
    user = await user.save();
    const authorizationToken = generateToken({
      _id: user?._id,
      email: user?.email,
    });

    return res.send(
      getResponseFormat({ user, authorizationToken }, 'User registered successfully')
    );
  } catch (err) {
    Logger.error(err);
    sendError(res, err.message, 500);
  }
};
