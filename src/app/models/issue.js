import mongoose, { Schema, model, models } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const IssueSchema = new Schema(
  {
    issue_id: String,
    machine_id: String,
    person_id: String,
    is_returnable: Boolean,
    due_date: String,
    order_is_completed: Boolean,
    description: String,
  },
  { timestamps: true }
);

const Issue = models.Issue || model("Issue", IssueSchema);

export default Issue;
