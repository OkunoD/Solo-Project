import mongoose, { Schema } from 'mongoose';

const accessoriesSchema = new Schema({
    itemName: {type: String, required: true},
    imgUrl: {type: String, required: true}
})

const AccessoryItem = mongoose.model('items', accessoriesSchema);

export default AccessoryItem;