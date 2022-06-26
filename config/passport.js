import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';

/**
 * Passport Strategy Options object for jwt middlware
 */
const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(strategyOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload?.uuid?._id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticate = passport.authenticate('jwt', { session: false });

export default app => {
  app.use(passport.initialize());
};
