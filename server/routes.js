const express = require('express');
const { response } = require('./server');
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
    const Hats = await HeadwearItem.find({});
    const Tops = await TopsItem.find({});
    const Jackets = await JacketsItem.find({});
    const Pants = await BottomsItem.find({});
    const Shoes = await ShoesItem.find({});
    const Accessories = await AccessoryItem.find({});
    const clothes = [Hats, Tops, Jackets, Pants, Shoes, Accessories];
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



