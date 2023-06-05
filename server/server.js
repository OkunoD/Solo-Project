const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const wardrobeRouter = require('./routes.js')
const { default: mongoose } = require('mongoose');
const MONGO_URI = 'mongodb+srv://derek:derek@cluster0.wmt8hg8.mongodb.net/';
const { User, Item } = require('./models.js')
//serve
//begin converting to TS 5/16/23


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

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

app.use(wardrobeRouter);

// app.get('/*', (req, res) => {
//     console.log('get request hit')
//     res.sendFile('/Users/derekokuno/codesmith/SoloProjectVirtualWardrobe/dist/index.html')
// });

app.post('/api/items', (req,res) => {
  console.log('items api hit');
  const { type, name, url, color } = req.body;

  const newItem = new Item({
    type,
    name,
    url,
    color,
  });

  newItem.save((err, savedItem) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('item saved');
      res.status(200).json(savedItem); 
    }
  });
});


//Below code to retrieve items in database
app.get('/api/items', (req, res) => {
  console.log('api/items get request hit')
  Item.find({}, (err, items) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('sending items: ', items);
      res.status(200).json(items);
    }
  });
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