require('dotenv').config();
require('./authConfig');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const { User, Item, Outfit } = require('./models.js');
const mongoose = require('mongoose');
const { 
  addItemController, 
  fillWardrobeController, 
  getItemController, 
  updateItemController,
  deleteItemController,
  getOutfitsController,
  addOutfitController,
  deleteOutfitController,
} = require('./controllers.js');

const router = express.Router(); 

router.use(express.json()); 
router.use(express.urlencoded({ extended: true }));
router.use(
  session({
    secret: process.env.API_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication
  console.log('in /auth/google/callback')

  res.redirect('/'); // Redirect to the dashboard or another page
});
router.get('/logout', (req, res) => {
  console.log("Logging out!");
  req.logout((err) => {
    if (err) { return next(err); }
    // res.status(200).json({ message: 'Logout Successful' });
    res.redirect('/');
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes and controllers
router.get('/api/items', fillWardrobeController);
router.post('/api/items', upload.single('file'), addItemController);
router.get('/api/items/:id', getItemController);
router.delete('/api/items/:itemId', deleteItemController);
router.put('/api/items/:itemId', updateItemController);

router.get('/api/outfits', getOutfitsController);
router.post('/api/outfits', addOutfitController);
router.delete('/api/outfits/:outfit_id', deleteOutfitController);

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

router.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
});

module.exports = router; 
