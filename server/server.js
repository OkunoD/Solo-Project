require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://derek:derek@cluster0.wmt8hg8.mongodb.net/';

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

app.use('/', router);

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