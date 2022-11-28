const express = require('express');

const sitModel = require('../models/sitModel');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports =
{
    addSit:async(req,res)=>{
        try {
            // console.log(req,res);
            let {  sitName, totalSeat,totalPrice, sitNumber,eventCategory,
                seatLocation,silverSeat,goldSeat,bronzeSeat,
                vipSeat, goldSeatPrice,silverSeatPrice,bronzeSeatPrice,vipSeatPrice,eventId,seatType,seatStatus } = req.body;
            
            let contactUs = await sitModel.create({
            sitName,
             totalSeat,
             sitNumber,totalPrice,eventCategory,
             seatLocation,silverSeat,goldSeat,bronzeSeat,vipSeat,
             goldSeatPrice,silverSeatPrice,bronzeSeatPrice,vipSeatPrice,eventId,seatType,seatStatus
            });
            
       res.status(200).json( contactUs );
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
    allSitDetails:async(req,res)=>{
        const AllContacts = await sitModel.find({})
        res.status(200).json({AllContacts})
    },

    wishListGet: async (req, res) => {
        const userId = req.params.userId;
        sitModel.aggregate([{
            $lookup: {
                from: 'events',
                localField: 'productId',
                foreignField: '_id',
                as: 'event'
            }
        },
        { $unwind: '$event' },
        { $unset: 'productId' },
        {
            $match: {
                userId: ObjectId(userId)
            }
        }]).then(data => {
            res.status(200).json({ success: true, msg: "All event in your wishlisty", data: data });
        }).catch(err => {
            res.status(400).json(err);
        });
    },

    addSit1: async (req, res) => {
        let model = new sitModel(req.body);
        sitModel.findOne({
            $and: [
                { "userId": req.body.userId },
                { "eventId": req.body.eventId },
            ]
        }, (err, info) => {
            // console.log(info);
            if (err) {
                res.status(400).send(err.message);
            } else {
                if (info == null) {
                    model.save((err, data) => {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            res.status(200).json({
                                success: true,
                                message: 'Sit Has Been Added To The SitList',
                                data: data
                            });
                        }
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: 'Sit Has Been Already Added in SitList'
                    })
                }
            }

        });
    },

    geteventById1: async (req, res) => {
        try {
            let EventData = await sitModel.find(req.quary.eventId);

            res.send({ responseCode: 200, responseMessage: 'find result', responseResult: [EventData] })

        } catch (error) {
            console.log(error)
        }
    },
}