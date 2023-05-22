const express = require('express');
const wardrobeModel = require('./models.js'); 
const wardrobeController = require('./controller.js');
const app = express(); 

const {User,
    HeadwearItem,
    TopsItem,
    JacketsItem,
    BottomsItem,
    ShoesItem,
    AccessoryItem} = wardrobeModel;

app.get('/wardrobe', async (req, res) => {
    const clothes = await wardrobeModel.find({});

    try {
        res.send(clothes);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post('/wardrobe/headwear', async (request, response) => {
    const hat = new HeadwearItem(request.body);
    try {
      await hat.save();
      response.send(hat);
    } catch (error) {
      response.status(500).send(error);
    }
});




module.exports = app; 



