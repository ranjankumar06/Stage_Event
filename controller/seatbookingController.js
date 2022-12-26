const express = require('express');

const booking = require('../models/bookingseat');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports =
{
    bookseat: async (req, res) => {
        try {
            let { userId, eventName, email, status, ticket_status, userType, 
                 singleSeatPrice, seatType,totalseat } = req.body;
                let pricecalcuate=totalseat*singleSeatPrice
            let contactUs = await booking.create({
                userId, eventName, email, status, ticket_status, userType,
                 totalSeatPrice:pricecalcuate, singleSeatPrice, seatType,totalseat
            });

            // res.status(200).json(contactUs);
            return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          


        } catch (error) {
            console.log(error);
            res.status(501).json({ success: false, message: "Something went wrong" })
        }
    },
    getseat:async(req,res)=>{
        const id = req.params._id;
        const AllContacts = await booking.findOne(id)
        res.status(200).json({AllContacts:[AllContacts]})
    },
    getAllseat:async(req,res)=>{
        const AllContacts = await booking.find({})
        res.status(200).json({AllContacts})
    },

    // wishListGet: async (req, res) => {
        // const userId = req.params.userId;
    //     booking.aggregate([{
    //         $lookup: {
    //             from: 'events',
    //             localField: 'productId',
    //             foreignField: '_id',
    //             as: 'event'
    //         }
    //     },
    //     { $unwind: '$event' },
    //     { $unset: 'productId' },
    //     {
    //         $match: {
    //             userId: ObjectId(userId)
    //         }
    //     }]).then(data => {
    //         res.status(200).json({ success: true, msg: "All event in your wishlisty", data: data });
    //     }).catch(err => {
    //         res.status(400).json(err);
    //     });
    // },

    // addSit1: async (req, res) => {
    //     let model = new booking(req.body);
    //     booking.findOne({
    //         $and: [
    //             { "userId": req.body.userId },
    //             { "eventId": req.body.eventId },
    //         ]
    //     }, (err, info) => {
    //         // console.log(info);
    //         if (err) {
    //             res.status(400).send(err.message);
    //         } else {
    //             if (info == null) {
    //                 model.save((err, data) => {
    //                     if (err) {
    //                         res.status(400).send(err.message);
    //                     } else {
    //                         res.status(200).json({
    //                             success: true,
    //                             message: 'Sit Has Been Added To The SitList',
    //                             data: data
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 res.status(200).json({
    //                     success: false,
    //                     message: 'Sit Has Been Already Added in SitList'
    //                 })
    //             }
    //         }

    //     });
    // },

    // wishListGet: async (req, res) => {
    //     const eventId = req.params.eventId;
    //     booking.aggregate([{
    //         $lookup: {
    //             from: 'events',
    //             localField: 'eventId',
    //             foreignField: '_id',
    //             as: 'event'
    //         }
    //     },
    //     { $unwind: '$event' },
    //     { $unset: 'eventId' },
    //     {
    //         $match: {
    //             eventId: ObjectId(eventId)
    //         }
    //     }]).then(data => {
    //         res.status(200).json({ success: true, msg: "All event in your wishlisty", data: data });
    //     }).catch(err => {
    //         res.status(400).json(err);
    //     });
    // },
}