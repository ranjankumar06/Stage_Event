 const mongoose =require("mongoose")
const mongoosePaginate = require('mongoose-paginate')
const Schema =mongoose.Schema

const ticketSchema = new Schema({
    userId:{
        type:String
    },
    eventName:{
        type:String
    },
    slotTime:{
        type:String
    },
    email:{
        type:String
    },
    slotDate:{
        type:String
    },
    slotEvent:{
        type:String
    },
    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },
    ticket_status:{
        type: String,
        enum:["SHOW","BOOK","BUY"],
        required:true,
      },
      status:{
        type:String,
        enum:["BOOKED","PENDING","INQUERY"],
        default:"PENDING"
    },
    },
    {
        timestamps:true
})

ticketSchema.plugin(mongoosePaginate)  
let ticketModel = mongoose.model("ticket", ticketSchema);
module.exports = ticketModel