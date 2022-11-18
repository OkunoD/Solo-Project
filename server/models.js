const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required :true},
    lastName: {type: String, required :true},
    userame: {type: String, required :true},
    password: {type: String, required :true}
});

const User = mongoose.model('users', userSchema); 

const headwearSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const HeadwearItem = mongoose.model('headwear', headwearSchema);


const topsSchema = new Schema ({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const TopsItem = mongoose.model('tops', topsSchema);


const jacketsSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const JacketsItem = mongoose.model('jackets', jacketsSchema);

const bottomsSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const BottomsItem = mongoose.model('bottoms', bottomsSchema);

const shoesSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const ShoesItem = mongoose.model('shoes', shoesSchema);

const accessoriesSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const AccessoryItem = mongoose.model('accessories', accessoriesSchema);

module.exports = {
    User,
    HeadwearItem,
    TopsItem,
    JacketsItem,
    BottomsItem,
    ShoesItem,
    AccessoryItem,
}