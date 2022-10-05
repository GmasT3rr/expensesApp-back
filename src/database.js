import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1/firstProjectDb', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('db is conected'))
    .catch(err => console.log(err));