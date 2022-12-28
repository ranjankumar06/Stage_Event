const express = require('express');
const booking = require('../models/bookingseat');
const seatmodel = require('../models/sitModel')
const ObjectId = require("mongoose").Types.ObjectId;

module.exports =
{
    bookseat: async (req, res) => {
        try {
            const AllContacts = await seatmodel.findOne()
            let { userId, eventName,  userType,
                seatType,  holdSeat } = req.body;
            if (seatType === "Gold") {
                var EventgoldSeat = AllContacts.goldSeat
                var remaningseat = AllContacts.goldSeat - holdSeat
                // var pricecalcuate = AllContacts.goldSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.goldSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
                var TotalseatType=AllContacts.goldSeat+AllContacts.silverSeat
                AllContacts.bronzeSeat+AllContacts.vipSeat
            }
            if (seatType === "Silver") {
                var EventSilverSeat = AllContacts.silverSeat
                var remaningseat = AllContacts.silverSeat - holdSeat
                // var pricecalcuate = AllContacts.silverSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.silverSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
                var TotalseatType=AllContacts.goldSeat+AllContacts.silverSeat
                AllContacts.bronzeSeat+AllContacts.vipSeat
            }
            if (seatType === "Bronze") {
                var EventBronzSeat = AllContacts.bronzeSeat
                var remaningseat = AllContacts.bronzeSeat - holdSeat
                // var pricecalcuate = AllContacts.bronzeSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.bronzeSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
                var TotalseatType=AllContacts.goldSeat+AllContacts.silverSeat
                AllContacts.bronzeSeat+AllContacts.vipSeat
            }
            if (seatType === "Vip") {
                var EventVipSeat = AllContacts.vipSeat
                var remaningseat = AllContacts.vipSeat - holdSeat
                // var pricecalcuate = AllContacts.vipSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.vipSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
                var TotalseatType=AllContacts.goldSeat+AllContacts.silverSeat
                AllContacts.bronzeSeat+AllContacts.vipSeat
            }

            let contactUs = await booking.Auth.create({
                userId, eventName,  userType,
                singleSeatPrice: SingleSeatPrice,
                Remaning: remaningseat, seatType,
                totalSeatType:TotalseatType,
                holdSeat, available: ablivaleSeat,
                eventgoldSeat: EventgoldSeat,
                eventSilverSeat:EventSilverSeat,
                eventBronzSeat:EventBronzSeat,
                eventVipSeat:EventVipSeat
            });
            // res.status(200).json(contactUs);
            return res.send({ reponseCode: 200, responseMessage: 'Messege send', result: contactUs })

        } catch (error) {
            console.log(error);
            res.status(501).json({ success: false, message: "Something went wrong" })
        }
    },
    getseat: async (req, res) => {
        const id = req.params._id;
        const AllContacts = await booking.findOne(id)
        res.status(200).json({ AllContacts: [AllContacts] })
    },
    getAllseat: async (req, res) => { 
        const AllContacts = await booking.find({})
        res.status(200).json({ AllContacts })
    },

    userseatbook: async (req, res) => {
        try {
            const AllContacts = await seatmodel.findOne()
            let { userId, eventName, seatType, numberofSeat } = req.body;
            if(seatType==="Vip"){
                var NumberofSeat=AllContacts.vipSeatPrice * numberofSeat
            }
            if(seatType==="Silver"){
                var NumberofSeat=AllContacts.silverSeatPrice * numberofSeat
            }
            if(seatType==="Bronze"){
                var NumberofSeat=AllContacts.bronzeSeatPrice * numberofSeat
            }
            if(seatType==="Gold"){
                var NumberofSeat=AllContacts.goldSeatPrice * numberofSeat
            }
            let contactUs = await booking.userBookseat.create({
                userId,
                eventName,
                seatType,
                numberofSeat,
                totalSeatprice:NumberofSeat
            });

            res.status(200).json({ success: true, message: 'Seat booked succesfully', contactUs });


        } catch (error) {
            console.log(error);
            res.status(501).json({ success: false, message: "Something went wrong" })
        }
    },
    getAlluserSeat: async (req, res) => { 
        const AllContacts = await booking.userBookseat.find({})
        res.status(200).json({ AllContacts })
    },
}