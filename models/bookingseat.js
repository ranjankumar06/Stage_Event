const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const bookingseat = new Schema({
    userId: {
        type: String,
        required: true,

    },
    eventName: {
        type: String
    },
    holdSeat: {
        type: String
    },
    Remaning:{
        type: String
    },
    available:{
        type: String
    },
    seatoutforEvent:{
        type: String
    },
    email: {
        type: String
    },
    // counter: {
    //     type: String,
    // },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
    ticket_status: {
        type: String,
        enum: ["SHOW", "BOOK", "BUY"],
        // required:true,
        default: "BOOK"

    },
    totalSeatPrice: {
        type: Number,
        required: true

    },
    soldSeat:{type: Number,
        required: true},

    singleSeatPrice: {
        type: Number,
        required: true

    },
    seatType: {
        type: String,
        enum: ["Gold", "Silver", "Bronze", "Vip"],
        required: true,
        default: "Bronze"
    },
    userType: {
        type: String,
        enum: ["USER", "ORGANIZER", "ADMIN"],
        default: "USER"
    }
},
    {
        timestamps: true
    })

bookingseat.plugin(mongoosePaginate)
let bookingseatModel = mongoose.model("bookingseat", bookingseat);
module.exports = bookingseatModel