const express = require('express');
const booking = require('../models/bookingseat');
const seatmodel = require('../models/sitModel')
const qrCode = require('qrcode')
const commonFunction = require('../helper/commonFunction');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports =
{
    // bookseat: async (req, res) => {
    //     try {
    //         const AllContacts = await seatmodel.findOne()
    //         let { userId, eventName, userType,
    //             seatType } = req.body;
    //         if (seatType === "Gold") {
    //             var EventgoldSeat = AllContacts.goldSeat
    //             var ablivalegoldSeat = AllContacts.goldSeat - AllContacts.holdgoldSeat
    //             // var pricecalcuate = AllContacts.goldSeatPrice * soldSeat
    //             var SingleSeatPrice = AllContacts.goldSeatPrice
    //             // var ablivaleSeat = remaningseat 
    //             var TotalseatType = AllContacts.goldSeat + AllContacts.silverSeat
    //             AllContacts.bronzeSeat + AllContacts.vipSeat
    //         }
    //         if (seatType === "Silver") {
    //             var EventSilverSeat = AllContacts.silverSeat
    //             var ablivalesilverSeat = AllContacts.silverSeat - AllContacts.holdSilverSeat
    //             // var pricecalcuate = AllContacts.silverSeatPrice * soldSeat
    //             var SingleSeatPrice = AllContacts.silverSeatPrice
    //             // var ablivaleSeat = remaningseat
    //             var TotalseatType = AllContacts.goldSeat + AllContacts.silverSeat
    //             AllContacts.bronzeSeat + AllContacts.vipSeat
    //         }
    //         if (seatType === "Bronze") {
    //             var EventBronzSeat = AllContacts.bronzeSeat
    //             var ablivalebronzeSeat = AllContacts.bronzeSeat - AllContacts.holdbronzeSeat
    //             // var pricecalcuate = AllContacts.bronzeSeatPrice * soldSeat
    //             var SingleSeatPrice = AllContacts.bronzeSeatPrice
    //             // var ablivaleSeat = remaningseat
    //             var TotalseatType = AllContacts.goldSeat + AllContacts.silverSeat
    //             AllContacts.bronzeSeat + AllContacts.vipSeat
    //         }
    //         if (seatType === "Vip") {
    //             var EventVipSeat = AllContacts.vipSeat
    //             var ablivalevipSeat = AllContacts.vipSeat - AllContacts.holdVipSeat
    //             // var pricecalcuate = AllContacts.vipSeatPrice * soldSeat
    //             var SingleSeatPrice = AllContacts.vipSeatPrice
    //             // var ablivaleSeat = remaningseat
    //             var TotalseatType = AllContacts.goldSeat + AllContacts.silverSeat
    //             AllContacts.bronzeSeat + AllContacts.vipSeat
    //         }

    //         let contactUs = await booking.Auth.create({
    //             userId, eventName, userType,
    //             singleSeatPrice: SingleSeatPrice, seatType,
    //             totalSeatType: TotalseatType,
    //             ablivaleSeatGold: ablivalegoldSeat,
    //             ablivaleSeatSilver: ablivalesilverSeat,
    //             ablivaleSeatVip: ablivalevipSeat,
    //             ablivaleSeatBronze: ablivalebronzeSeat,
    //             eventgoldSeat: EventgoldSeat,
    //             eventSilverSeat: EventSilverSeat,
    //             eventBronzSeat: EventBronzSeat,
    //             eventVipSeat: EventVipSeat
    //         });
    //         // res.status(200).json(contactUs);
    //         return res.send({ reponseCode: 200, responseMessage: 'Messege send', result: contactUs })

    //     } catch (error) {
    //         console.log(error);
    //         res.status(501).json({ success: false, message: "Something went wrong" })
    //     }
    // },
    
    userseatbook: async (req, res) => {
        try {
            const AllContacts = await seatmodel.findOne()
            let { userId, eventName, seatType, numberofSeat, qrImg } = req.body;
            if (seatType === "Vip") {
                var NumberofSeat = AllContacts.vipSeatPrice * numberofSeat
            }
            if (seatType === "Silver") {
                var NumberofSeat = AllContacts.silverSeatPrice * numberofSeat
            }
            if (seatType === "Bronze") {
                var NumberofSeat = AllContacts.bronzeSeatPrice * numberofSeat
            }
            if (seatType === "Gold") {
                var NumberofSeat = AllContacts.goldSeatPrice * numberofSeat
            }
            for(let i=1;i<=req.body.numberofSeat; i++ ){
            let stringData = JSON.stringify({...req.body,seatNo:i})
            let qr = await qrCode.toDataURL(stringData)
            let qrImage = await commonFunction.uploadImage(qr)
            var updater = await booking.userBookseat.create({
                userId,
                eventName,
                seatType,
                seatNo:i,
                qrImg: qrImage,
                totalSeatprice: NumberofSeat
            })
        }
            return res.send({ reponseCode: 200, responseMessage: 'ticket booking successfully', updater })
        } catch (error) {
            console.log(error);
            res.status(501).json({ success: false, message: "Something went wrong" })
        }
    },
    getAlluserSeat: async (req, res) => {
        const AllContacts = await booking.userBookseat.find({})
        res.status(200).json({ AllContacts })
    },

    getseat: async (req, res) => {
        const id = req.params._id;
        const AllContacts = await booking.userBookseat.findOne(id)
        res.status(200).json({ AllContacts: [AllContacts] })
    },
}