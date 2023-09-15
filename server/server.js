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

function logRouteHit(req, res, next) {
  console.log('Route hit');
  next(); // Call next to proceed to the route handler
}

app.get('/auth/google', logRouteHit, passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication
  console.log('in /auth/google/callback')
  res.redirect('/'); // Redirect to the dashboard or another page
});

app.get('/logout', (req, res) => {
  console.log("attempting log out!");
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

app.post('/api/items', upload.single('file'), async(req,res) => {
  if (!req.file) {
    return res.status(400).send(JSON.stringify('No file uploaded.'));
  }
  
  const item = new Item({
    file: req.file.buffer,
    contentType: req.file.mimetype,
    id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    color: req.body.color,
  })
  console.log("item in server is: ", item)

  try {
    await item.save();
    res.status(200).send(JSON.stringify('File uploaded and saved.'));
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).send('Internal server error.');
  }
});

//Below code to retrieve items in database
app.get('/api/items', (req, res) => {
  console.log('api/items get request hit')
  Item.find({}, (err, items) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log('sending items: ', items);
      // console.log(JSON.stringify(items))
      res.status(200).json(items);
    }
  });
});

app.get('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  console.log('api/items/:id get request hit!')
  try {
    const item = await Item.find({id: id});
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    };
    res.json(item);
  } catch {
    console.log(error);
    res.status(500).json({message: 'Server error in get to /api/items/:id'});
  }
})


app.delete('/api/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deletedItem = await Item.deleteOne({id: itemId});

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
})

app.get('/api/outfits', async (req, res) => {
  Outfit.find({}, (err, outfits) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('server outfits !!!!', JSON.stringify(outfits));
      res.status(200).json(outfits);
    }
  })
})

app.post('/api/outfits', async (req, res) => {
  console.log('req.body in server is: ', req.body);
  if (!req.body.name) {
    return res.status(400).send(JSON.stringify('Need outfit name.'));
  }
  const outfit = new Outfit({
    name: req.body.name,
    outfit: req.body.outfit,
  })

  console.log("outfit in server is: ", outfit);

  try {
    await outfit.save();
    res.status(200).send(JSON.stringify('outfit saved.'));
  } catch (error) {
    console.error('Error saving outfit:', error);
    res.status(500).send('Internal server error.');
  }
})

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