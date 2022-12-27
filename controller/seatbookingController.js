const express = require('express');
const booking = require('../models/bookingseat');
const seatmodel = require('../models/sitModel')
const ObjectId = require("mongoose").Types.ObjectId;

module.exports =
{
    bookseat: async (req, res) => {
        try {
            const AllContacts = await seatmodel.findOne()
            let { userId, eventName, email,
                status, ticket_status, userType,
                seatType, soldSeat, holdSeat } = req.body;
            if (seatType === "Gold") {
                var seatoutforevent = AllContacts.goldSeat
                var remaningseat = AllContacts.goldSeat - soldSeat
                var pricecalcuate = AllContacts.goldSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.goldSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
            }
            if (seatType === "Silver") {
                var seatoutforevent = AllContacts.silverSeat
                var remaningseat = AllContacts.silverSeat - soldSeat
                var pricecalcuate = AllContacts.silverSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.silverSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
            }
            if (seatType === "Bronze") {
                var seatoutforevent = AllContacts.bronzeSeat
                var remaningseat = AllContacts.bronzeSeat - soldSeat
                var pricecalcuate = AllContacts.bronzeSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.bronzeSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
            }
            if (seatType === "Vip") {
                var seatoutforevent = AllContacts.vipSeat
                var remaningseat = AllContacts.vipSeat - soldSeat
                var pricecalcuate = AllContacts.vipSeatPrice * soldSeat
                var SingleSeatPrice = AllContacts.vipSeatPrice
                var ablivaleSeat = remaningseat - holdSeat
            }

            let contactUs = await booking.create({
                userId, eventName, email, status, ticket_status, userType,
                totalSeatPrice: pricecalcuate, singleSeatPrice: SingleSeatPrice,
                Remaning: remaningseat, seatType, soldSeat,
                holdSeat, Ablibaleseat: ablivaleSeat, seatoutforEvent: seatoutforevent
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


}