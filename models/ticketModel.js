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
    email:{
        type:String
    },
    counter:{
        type:Number,
      },
    serialNo:{
        type:String
    },
    price:{
        type:String
    },
    slotTime:{
        type:String
    },
   
    qrImg:{
        type:String,
      },
 
    slotDate:{
        type:[String]
    },
    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },
    ticket_status:{
        type: String,
        enum:["SHOW","BOOK","BUY"],
        // required:true,
        default:"BOOK"

      },
      userType:{
        type:String,
        enum:["USER","ORGANIZER","ADMIN"],
        default:"USER"
    }
    },
    {
        timestamps:true
})

ticketSchema.plugin(mongoosePaginate)  
let ticketModel = mongoose.model("ticket", ticketSchema);
module.exports = ticketModel