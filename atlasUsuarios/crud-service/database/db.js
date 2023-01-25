import mongoose from 'mongoose';


const Connection = async () => {
    const URL = `mongodb+srv://admin:tGV1z6wxFi9qOBmL@cluster0.eyhnkel.mongodb.net/completoAtlas?retryWrites=true&w=majority`

    try {
       //conecto con mongo, le paso los argumentos y si hay error lo muestro
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;