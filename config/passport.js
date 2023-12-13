const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const bcrypt = require('bcryptjs');
const User = connection.models.Users;


const verifyCallback = (username, password, done) => {
    User.findOne({username: username}).then((user) => {
        if(!user) {
            return done(null, false)
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if(isValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
    .catch((err) => {
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