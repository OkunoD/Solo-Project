import mongoose, { Schema } from 'mongoose';

const jacketsSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const JacketsItem = mongoose.model('items', jacketsSchema);

export default JacketsItem;