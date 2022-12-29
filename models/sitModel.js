const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const sitSchema =new Schema({
    silverSeat: {
        type: Number,
    },
    goldSeat: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    goldSeatPrice: {
        type: Number,
    },
    silverSeatPrice: {
        type: Number,
    },
    bronzeSeatPrice: {
        type: Number,
    },
    vipSeatPrice: {
        type: Number,
    },
    bronzeSeat: {
        type: Number,
    },
    vipSeat: {
        type: Number,
    },
    holdgoldSeat: {
        type: Number,
    },
    holdSilverSeat: {
        type: Number,
    },
    holdVipSeat: {
        type: Number,
    },
    holdbronzeSeat: {
        type: Number,
    },
    // userType: {
    //     type: String,
    //     enum: ["ADMIN"],
    //     default: "ADMIN"
    // },
    eventId: { type: String, required: true},
    userId: { type: String, required: true },
    eventCategory: {
        type: String,
        enum: ["CHURCH", "THEATRE", "STANDING", "STADIUM"],
        default: "THEATRE"
    },
},
{ timestamps: true },

)


sitSchema.plugin(mongoosePaginate) 
const sitModel = mongoose.model('sit',sitSchema);
module.exports = sitModel