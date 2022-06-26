import jwt from 'jsonwebtoken';

/**
 * Generates JWT token
 * @param {Object} user - user object
 * @return {string} signed JWT token
 */
export const generateToken = (user = {}) => {
  try {
    // Token expiration age in mins
    const tokenExpireInMins = Math.floor(Date.now() / 1000) + 60 * process.env.TOKEN_EXPIRE_AGE;
    return jwt.sign(
      {
        uuid: user,
        exp: tokenExpireInMins,
      },
      process.env.JWT_SECRET
    );
  } catch (err) {
    throw err;
  }
};
