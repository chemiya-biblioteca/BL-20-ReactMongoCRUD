import mongoose from 'mongoose';



const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: Number
});



// creo esquema de mongo y lo exporto
const postUser = mongoose.model('user', userSchema);

export default postUser;