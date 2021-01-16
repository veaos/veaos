import passport from 'passport';
import { slackStrategy } from '../config/passport';
import { User } from '../models/User';

export const passportLoader = ({ expressApp }): void => {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(slackStrategy);
  expressApp.use(passport.initialize());
  expressApp.use(passport.session());

  expressApp.get('/auth/slack', passport.authenticate('slack'));
  expressApp.get(
    '/auth/slack/callback',
    passport.authenticate('slack'),
    (req, res) => res.redirect(process.env.PORTAL_URL)
  );
};
