const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const sitSchema =new Schema({
    silverSeat: {
        type: String,
    },
    goldSeat: {
        type: String,
    },
    totalPrice: {
        type: String,
    },
    goldSeatPrice: {
        type: String,
    },
    silverSeatPrice: {
        type: String,
    },
    bronzeSeatPrice: {
        type: String,
    },
    vipSeatPrice: {
        type: String,
    },
    bronzeSeat: {
        type: String,
    },
    vipSeat: {
        type: String,
    },
    holdgoldSeat: {
        type: String,
    },
    holdSilverSeat: {
        type: String,
    },
    holdVipSeat: {
        type: String,
    },
    holdbronzeSeat: {
        type: String,
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