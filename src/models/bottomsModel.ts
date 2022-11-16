import mongoose, { Schema } from 'mongoose';

const bottomsSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const BottomsItem = mongoose.model('items', bottomsSchema);

export default BottomsItem;