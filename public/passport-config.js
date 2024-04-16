const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const Korisnik = require('../models/korisnikModel');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match korisnik
      Korisnik.findOne({
        email: email
      }).then(korisnik => {
        if (!korisnik) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, korisnik.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, korisnik);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(korisnik, done) {
    done(null, korisnik.id);
  });

  passport.deserializeUser(function(id, done) {
    Korisnik.findById(id, function(err, korisnik) {
      done(err, korisnik);
    });
  });
};