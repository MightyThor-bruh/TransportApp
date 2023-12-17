import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';
import bcrypt from 'bcryptjs';

const User = db.getModel(DB_COLLECTIONS.USERS);

const verifyCallback = (username, password, done) => {
    User.findOne({ username }).then((user) => {
        console.log(`User found!`);
        if(!user) {
            return done(null, false)
        }
        const isValid = password === user.password;
        if(isValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
    .catch((err) => {        
        console.log(`Cannot find User!`);
        done(err);
    });
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);


//user serialization and deserialization in the session

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((userId, done) => {
    User.findById(userId).then((user) => {
        done(null, user);
    })
    .catch(err => done(err))
});