const mongoose = require("mongoose")
// const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const bookingseat = new Schema({
    userId: {
        type: String,
        required: true,

    },
    eventName: {
        type: String
    },
    goldseathold: {
        type: Number
    },
    silverseathold: {
        type: Number
    },
    vipseathold: {
        type: Number
    },
    bronzseathold: {
        type: Number
    },
    Remaning: {
        type: Number
    },
    available: {
        type: Number
    },
    eventgoldSeat: {
        type: Number
    },
    eventSilverSeat: {
        type: Number
    },
    eventBronzSeat: {
        type: Number
    },
    eventVipSeat: {
        type: Number
    },

    // email: {
    //     type: String
    // },
    totalSeatType: {
        type: Number
    },
    // counter: {
    //     type: String,
    // },
    // status: {
    //     type: String,
    //     enum: ["ACTIVE", "BLOCK", "DELETE"],
    //     default: "ACTIVE"
    // },
    // ticket_status: {
    //     type: String,
    //     enum: ["SHOW", "BOOK", "BUY"],
    //     // required:true,
    //     default: "BOOK"

    // },
    // totalSeatPrice: {
    //     type: Number,
    //     required: true

    // },
    // soldSeat: {
    //     type: Number,
    //     required: true
    // },

    singleSeatPrice: {
        type: Number,
    },
    ablivaleSeatGold: {
        type: Number
    },
    ablivaleSeatSilver: {
        type: Number
    },
    ablivaleSeatVip: {
        type: Number
    },
    ablivaleSeatBronze: {
        type: Number
    },
    // seatType: {
    //     type: String,
    //     enum: ["Gold", "Silver", "Bronze", "Vip"],
    //     required: true,
    //     default: "Bronze"
    // },
    // userType: {
    //     type: String,
    //     enum: ["ADMIN"],
    //     default: "ADMIN"
    // }
},
    {
        timestamps: true
    })



const UserBookseat = {
    userId: { type: String },
    eventName: { type: String },
    seatType: {
        type: String,
        enum: ["Gold", "Silver", "Bronze", "Vip"],
        required: true,
        default: "Bronze"
    },
    numberofSeat: { type: Number },
    qrImg: {
        type: String,
    },
    totalSeatprice: { type: Number },
    createdAt: Date,
    updatedAt: Date
}
//   const userBookseat=new Schema(UserBookseat,{versionKey:false,timestamps:true});

// bookingseat.plugin(mongoosePaginate)
// let bookingseatModel = mongoose.model("bookingseat", bookingseat);

module.exports = {
    Auth: mongoose.model("bookingseat", bookingseat),
    userBookseat: mongoose.model("UserBookseat", UserBookseat)

}