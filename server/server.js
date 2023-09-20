require('dotenv').config();
require('./authConfig');
const express = require('express');
const session = require('express-session')
const passport = require('passport');
const app = express();
const multer = require('multer');
const path = require('path');
const PORT = 3000;
const { User, Item, Outfit } = require('./models.js')
const { default: mongoose } = require('mongoose');
const MONGO_URI = 'mongodb+srv://derek:derek@cluster0.wmt8hg8.mongodb.net/';
const { 
  addItemController, 
  fillWardrobeController, 
  getItemController, 
  deleteItemController,
  getOutfitsController,
  addOutfitController,
  deleteOutfitController,
 } = require('./controllers.js')

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret:process.env.API_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication
  console.log('in /auth/google/callback')

  res.redirect('/'); // Redirect to the dashboard or another page
});
app.get('/logout', (req, res) => {
  console.log("Logging out!");
  req.logout((err) => {
    if (err) { return next(err); }
    // res.status(200).json({ message: 'Logout Successful' });
    res.redirect('/');
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'Cluster0',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, '../dist')));

//  APP ROUTES
app.post('/api/items', upload.single('file'), addItemController);
app.get('/api/items', fillWardrobeController);
app.get('/api/items/:id', getItemController);
app.delete('/api/items/:itemId', deleteItemController);

app.get('/api/outfits', getOutfitsController);
app.post('/api/outfits', addOutfitController);
app.delete('/api/outfits/:outfit_id', deleteOutfitController);

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    // console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (error) => {
    if(error) {
        console.log('Something went wrong', error)
    } else {
    console.log(`Express is listening on localhost:${PORT}`)
    }
});

module.exports = app;