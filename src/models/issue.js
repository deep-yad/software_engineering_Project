import { Schema, model, models } from "mongoose";


const IssueSchema = new Schema({
    issue_id: {
        type: Number,
        unique: [true, 'Issue_id already exists!'],
        required: [true, 'Issue_id is required']
    },
    machine_id: {
        type: Number,
        required: [true, 'Machine_Id required']
    },
    person_id: {
        type: Number,
        required: [true, 'Person_Id is required']
    },
    is_returnable: {
        type: Boolean,
        required: [true, 'If Object returnable then True otherwaise False']
    },
    due_date: {
        type: Date
    },
    order_is_completed: {
        type: Boolean
    },
    description: {
        type: String
    }
},{timestamps:true})

const Issue = models.Issue || model('Issue', IssueSchema);

export default Issue;