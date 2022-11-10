const express = require("express");
const newsLetter = require("../models/news_letterModel");


module.exports = {

    addSubscription: async (req, res) => {
        const user = await newsLetter.findOne({ "email": req.body.email });
        if (user) {
            res.json({
                success: true,
                message: 'Already Suscribe For Newsletter'
            });
        } else {
            const subscription = await newsLetter.create(req.body);
            res
                .status(201)
                .json({ subscription, success: true, message: "Subscribed ✌" });
        }
    },

    getAllUserSubscription: async (req, res) => {
        try {
            const findPerMonth = new Date()
            console.log(findPerMonth.getMonth() + 1)
            const subscribed = await newsLetter.find({});

            res.status(200).json({ subscribed, count: subscribed.length });
        } catch (error) {
            res
                .status(404)
                .json({ success: false, message: "Oops! Something Went Wrong." });
        }
    }
}


