import { Strategy as SlackStrategy } from 'passport-slack';
import { upsertUser } from '../models/User';

const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = process.env;

export const slackStrategy = new SlackStrategy(
  {
    clientID: SLACK_CLIENT_ID,
    clientSecret: SLACK_CLIENT_SECRET,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await upsertUser(profile.user);
    done(null, user);
  }
);
