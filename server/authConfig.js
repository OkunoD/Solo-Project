const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models.js'); 



passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback:true,
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      console.log(profile)
      return done(null,profile)
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


async function findOrCreate(email, username) {
  try {
    // Try to find the user by their email or username
    let user = await User.findOne({ $or: [{ email }, { username }] });

    // If the user exists, return it
    if (user) {
      return user;
    } else {
      // If the user doesn't exist, create a new user
      user = new User({ email, username });
      await user.save();
      return user;
    }
  } catch (error) {
    throw error;
  }
}
