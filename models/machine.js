import { Schema, model, models } from "mongoose";

const MachineSchema = new Schema({
    machine_id: {
        type: Number,
        required:[true,'Machine Id required']
    },
    description: {
        type:String
    },
    total_quantity: {
        type:Number
    },
    available_quantity: {
        type:Number
    },
    subparts: [
        {
            subpart_name: {
                type:String
            },
            subpart_available_quantity: {
                type:Number
            }
        }
    ],
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

const Machine = models.Machine || model('Machine', MachineSchema);

export default Machine;