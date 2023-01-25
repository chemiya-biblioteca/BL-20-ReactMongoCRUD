import mongoose from "mongoose";

const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
});
//creo esquema de mongo y lo exporto
export default mongoose.model('Users', User);