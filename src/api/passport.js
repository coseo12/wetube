import passport from 'passport';
import GitgubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import {
  fbLoginCallback,
  githubLoginCallback,
} from '../controllers/user-controller';
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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.fbCallback}`,
    },
    fbLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
