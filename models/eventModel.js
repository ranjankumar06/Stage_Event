
const mongoose = require("mongoose");
let aggregatePaginate =require('mongoose-aggregate-paginate-v2')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	eventName: {
		type: String,
		required: true
	},
    startDate:{
        type: Date,
       require: true
    },
    endDate:{
        type: Date,
         require: true
    },

	slots:{
		type:[String]
    },   
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    address: {
		type: String,
	},
    contractNo:{
        type:Number
    },
    price:{
        type: Number,
         required: true
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:'address'
        }, 
	status:{
        type:String,
        enum:["ACTIVE","BLOCKED","DELETE"],
        default:"ACTIVE"
    },
    event_status: {
        type: String,
        enum : ['Upcomming','live',"Cancelled",'Done'],
        required: true,
        default:"Upcomming"
    },
    event_category: {
        type: String,
        enum : ['Sports events','Trade fairs or exhibitions',"Live Events",'Charity/Fundraising Events','Corporate Events','Others'],
        required: true
    },
},
    {
    timestamps:true
});

eventSchema.plugin(aggregatePaginate);
eventSchema.index({location: "2dsphere" });

let eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel


