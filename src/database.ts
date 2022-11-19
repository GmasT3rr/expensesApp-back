import mongoose, { ConnectOptions } from "mongoose";
const mongoURI = 'mongodb+srv://lucramallo14:xSuQYrZRVtVqWsoQ@eacluster.f4wlrvp.mongodb.net/?retryWrites=true&w=majority';
const mongoLocal = 'mongodb://127.0.0.1/firstProjectDb';

// const connectDB = mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
//     .then(db => console.log('db is conected'))
//     .catch(err => console.log(err));


// export default connectDB;
const connectDB = mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log(
          'Connected to Database - Initial Connection'
        );
      })
      .catch((err:any) => {
        console.log(
          `Connection error occured -`,
          err
        );
      });