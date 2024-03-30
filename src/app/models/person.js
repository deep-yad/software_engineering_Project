import mongoose, { Schema, model, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const PersonSchema = new Schema({
  email_id: {
    type: String,
    required: [true, "Machine Id required"],
  },
  person_name: {
    type: String,
  },
  mobile_number: {
    type: String,
    match: /^[0-9]+$/,
  },
  current: [
    {
      issue_id: String,
    },
  ],
  completed: [
    {
      issue_id: Number,
    },
  ],
});

const Person = models.Person || model("Person", PersonSchema);

export default Person;
