import mongoose, { ConnectOptions } from "mongoose";
const mongoURI = 'the db host';
// const mongoLocal = 'the local host';

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