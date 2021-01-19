import passport from 'passport';
import GitgubStrategy from 'passport-github';
import { githubLoginCallback } from '../controllers/user-controller';
import User from '../models/User';
import routes from '../routes';

passport.use(User.createStrategy());

passport.use(
  new GitgubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
