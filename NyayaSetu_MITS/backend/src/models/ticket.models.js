import mongoose from 'mongoose'
import { type } from 'os';

const { Schema } = mongoose;

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Solved", "Pending", "Rejected"],
        default: "Pending"
    },
    attachments: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        required:true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    contactNumber:{
        type:Number,
        minlength:[10,"Contact number must be at least 10 digits"],
        required:true
    },
    email:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"Medium"
    },
    userType:{
        type:String
    }

}, {
    timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket