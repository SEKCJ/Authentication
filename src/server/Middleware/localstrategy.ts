import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import { ComparePassword } from '../Utils/Security/passwords';
import DB from '../DB';

passport.serializeUser((user, done) => {
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    return done(null, user);
})

passport.use(new LocalStrategy.Strategy({
    usernameField: "email",
    session: false,
}, async (email, password, done) => {
    try {
        let [user]: any = await DB.Users.findOneByEmail(email);
        if (user && ComparePassword(password, user.password)) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));