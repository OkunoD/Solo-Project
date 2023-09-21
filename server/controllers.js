const { User, Item, Outfit} = require('./models');

const fillWardrobeController = (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log('error');
      res.status(500).send(err);
    } else {
      res.status(200).json(items);
    }
  });
};

const addItemController = async (req, res, next) => {
  if (!req.file && !req.body.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  if (req.file) {
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
    try {
      await item.save();
      res.status(200).json({ message: 'Item uploaded and saved.' });
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } 
  // Below is just for testing (difficulties w/req.file being undefined in tests.)
  else {
    const item = new Item({
      file: req.body.file,
      contentType: req.body.contentType,
      id: req.body.id,
      name: req.body.name,
      type: req.body.type,
      color: req.body.color,
      brand: req.body.brand,
      size: req.body.size,
    })
    try {
      await item.save();
      res.status(200).json({ message: 'Item uploaded and saved.' });
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

const getItemController = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.find({id: id});
    if (item.length === 0) {
      return res.status(404).json({ message: 'Item not found.' });
    } else {
      res.json(item);
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error in get to /api/items/:id' });
  }
};

const deleteItemController = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const deletedItem = await Item.deleteOne({id: itemId});

    if (deletedItem.deletedCount === 0) {
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
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(outfits);
    }
  })
};

const addOutfitController = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Need outfit name.' });
  }
  const outfit = new Outfit({
    name: req.body.name,
    outfit: req.body.outfit,
  })
  try {
    await outfit.save();
    res.status(200).json({ message: 'Outfit saved.'});
  } catch (error) {
    console.error('Error saving outfit:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const deleteOutfitController = async (req, res) => {
  const outfit_id =  req.params.outfit_id;
  try {
    const deletedOutfit = await Outfit.deleteOne({_id: outfit_id})
    if (deletedOutfit.deletedCount === 0) {
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