import mongoose, { Schema, model, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  emailid:String,
  username:String ,
  password:String,
  isAdmin:Boolean
});

const User = models.User || model("User", UserSchema);

export default User;
