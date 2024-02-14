import mongoose from "mongoose";

let isConnected = false; // track the connection
// NCPlQ9BDo2HTRtyc;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "makerspace",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
    return db;
  } catch (error) {
    console.log(error);
  }
};
