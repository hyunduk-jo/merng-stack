import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/User';
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  await User.findOne({ _id: payload._id }, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
}));

export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
}

passport.initialize();