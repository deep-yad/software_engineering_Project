import { Schema, model, models } from "mongoose";

const PersonSchema = new Schema({
    email_id: {
        type: String,
        required:[true,'Machine Id required']
    },
    person_name: {
        type: String
    },
    mobile_number: {
        type: String,
        match: /^[0-9]+$/,
    },
    current: [
        {
            issue_id:Number
        }
    ],
    completed: [
        {
            issue_id:Number
        }
    ]
})

const Person = models.Person || model('Person', PersonSchema);

export default Person;