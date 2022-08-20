
const mongoose = require("mongoose");
// let aggregatePaginate =require('mongoose-aggregate-paginate-v2')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema;

const eventSchema = new Schema({
	eventName: {
		type: String,
		required: true
	},
    artistName: {
		type: String,
		// required: true
	},
    startDate:{
        type: [String],
		required: true,
        // now.Date
    },

    endDate:{
        type: [String],
		required: true

    },
    searchDate:{
        type:[String],
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
    country:{
		type: String,
	},
    city: {
		type: String,
	},
    contractNo:{
        type:Number,
		required: true

    },
    price:{
        type: Number,
		required: true

    },
    openingTime:{
        type:String,
		required: true

    },
    closingTime:{
        type:String,
		required: true

    },
    eventImage:{
        type:[String]
      },
    description:{
        type:String
    },
    createdAt: Date,
    updatedAt: Date,
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
        required: false,
        default:"Upcomming"
    },
    events:{
       type:String,
       enum:['WEEKDAY','WEEKEND'],
       default:"WEEKDAY"
    },
    eventCategory: {
        type: String,
        enum : ['Sports events','Trade fairs or exhibitions','Charity/Fundraising Events','Corporate Events','Concart'],
        required: false,
        default:"Concart",
    },
},
    {
    timestamps:true
});
eventSchema.pre('save', function(next) {
	const currentDate = new Date();
    if (!this.createdDate){
        this.createdDate = currentDate;
    }
    next();
});
// eventSchema.plugin(aggregatePaginate);
eventSchema.plugin(mongoosePaginate) 

eventSchema.index({location: "2dsphere" });

let eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel


