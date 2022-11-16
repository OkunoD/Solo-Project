import mongoose, { Schema } from 'mongoose';


const shoesSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const ShoesItem = mongoose.model('items', shoesSchema);

export default ShoesItem;