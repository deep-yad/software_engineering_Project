import mongoose from "mongoose";

const connect  = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log("Connected to DB");
    } catch (error) {
        console.log("ERROR in CONNECTING to DataBase");
        throw new Error("Error in Connecting to DB");
    }
}

export default connect;