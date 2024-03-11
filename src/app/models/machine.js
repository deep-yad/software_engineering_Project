import mongoose, { Schema, model, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const MachineSchema = new Schema({
  machine_id: {
    type: Number,
    required: [true, "Machine Id required"],
  },
  description: {
    type: String,
  },
  total_quantity: {
    type: Number,
  },
  available_quantity: {
    type: Number,
  },
  subparts: [
    {
      subpart_name: String,
      subpart_available_quantity: Number,
    },
  ],
  current: [
    {
      issue_id: Number,
    },
  ],
  completed: [
    {
      issue_id: Number,
    },
  ],
});

const Machine = models.Machine || model("Machine", MachineSchema);

export default Machine;
