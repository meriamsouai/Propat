const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.googleId = profile.id;
        await user.save();
      } else {
        user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          userType: 'client',
          phone: '',
          address: '',
          city: '',
          zipCode: '',
          country: '',
          verified: true
        });
        await user.save();
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Passport Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    
    if (!user) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.facebookId = profile.id;
        await user.save();
      } else {
        user = new User({
          facebookId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          userType: 'client',
          phone: '',
          address: '',
          city: '',
          zipCode: '',
          country: '',
          verified: true
        });
        await user.save();
      }
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;