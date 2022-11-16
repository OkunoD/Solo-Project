import mongoose, { Schema } from 'mongoose';

const headwearSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const HeadwearItem = mongoose.model('items', headwearSchema);

export default HeadwearItem;