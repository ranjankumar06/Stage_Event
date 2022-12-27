const seattModel = require('../models/sitModel');

module.exports =
{
    addSeat: async (req, res) => {
        try {
            // console.log(req,res);
            let { eventCategory,
                silverSeat,
                goldSeat,
                bronzeSeat,
                vipSeat,
                goldSeatPrice,
                silverSeatPrice,
                bronzeSeatPrice,
                vipSeatPrice,
                eventId,
                userId,
                holdSeat
            } = req.body;

            let CreateSeat = await seattModel.create({
                eventCategory, holdSeat,
                silverSeat, goldSeat, bronzeSeat, vipSeat,
                goldSeatPrice, silverSeatPrice, bronzeSeatPrice,
                vipSeatPrice, eventId, userId
            });
            res.status(200).json({ success: true, message: 'CreateSeat save succesfully', CreateSeat });


        } catch (error) {
            console.log(error);
            res.status(501).json({ success: false, message: "Something went wrong" })
        }
    },
    allSitDetails: async (req, res) => {
        const AllContacts = await seattModel.find({})
        res.status(200).json({ AllContacts })
    },
    seatUpdate: async (req, res) => {
        try {
            const _id = req.params.id
            const update = await seattModel.findByIdAndUpdate(_id, req.body)
            res.send(update)
        }
        catch (error) {
            return res.status(500).json({
                status: 0,
                message: "something went wrong",
            });
        }
    },

    
}