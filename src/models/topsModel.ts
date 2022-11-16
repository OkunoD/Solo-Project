import mongoose, { Schema } from 'mongoose';

const topsSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const TopsItem = mongoose.model('items', topsSchema);

export default TopsItem;