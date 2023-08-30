const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstName: {type: String, required :true},
    lastName: {type: String, required :true},
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

module.exports = {
    User,
    Item,
}