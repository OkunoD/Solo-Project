import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: {type: String, required :true},
    lastName: {type: String, required :true},
    userame: {type: String, required :true},
    password: {type: String, required :true}
});

const User = mongoose.model('users', userSchema); 

export default User;