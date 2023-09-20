const { User, Item, Outfit} = require('./models');

const addItemController = async (req, res, next) => {
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
      brand: req.body.brand,
      size: req.body.size,
    })
    console.log("item in server is: ", item)
  
    try {
      await item.save();
      res.status(200).send(JSON.stringify('File uploaded and saved.'));
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).send('Internal server error.');
    }
};

const fillWardrobeController = (req, res) => {
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
};

const getItemController = async (req, res) => {
  const { id } = req.params;
  console.log('api/items/:id get request hit!')
  try {
    const item = await Item.find({id: id});
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    };
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error in get to /api/items/:id'});
  }
};

const deleteItemController = async (req, res) => {
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
};

const getOutfitsController = async (req, res) => {
  Outfit.find({}, (err, outfits) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('server outfits !!!!', JSON.stringify(outfits));
      res.status(200).json(outfits);
    }
  })
};

const addOutfitController = async (req, res) => {
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
};

const deleteOutfitController = async (req, res) => {
  console.log('inside /api/outfits/:outfit_id in server');
  const outfit_id =  req.params.outfit_id;
  try {
    const deletedOutfit = await Outfit.deleteOne({_id: outfit_id})
    if (!deletedOutfit) {
      return res.status(404).json({ message: 'Outfit not found.' });
    }
    res.status(200).json({ message: 'Outfit deleted successfully.' });
  } catch (error) {
    console.error('Error deleting outfit:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } 
};


module.exports = { 
  addItemController, 
  fillWardrobeController, 
  getItemController,
  deleteItemController,
  getOutfitsController,
  addOutfitController,
  deleteOutfitController,
};