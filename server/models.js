const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    userame: {type: String, required :true},
    password: {type: String, required :true}
});
const User = mongoose.model('users', userSchema); 



const itemSchema = Schema({
    file: {type: Buffer},
    contentType: {type: String},
    id: {type: Number},
    type: {type: String},
    name: {type: String},
    color: {type: String},
})
const Item = mongoose.model('Item', itemSchema); 



const outfitSchema = Schema({
    name: {type: String},
    outfit: [{ type: Schema.Types.ObjectId, ref: 'Item' }], // Array of Item references
})
const Outfit = mongoose.model('Outfit', outfitSchema);



module.exports = {
    User,
    Item,
    Outfit,
}