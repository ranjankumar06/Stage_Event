const seattModel = require('../models/sitModel');
const bookseat = require('../models/bookingseat')

module.exports =
{
    addSeat: async (req, res) => {
        try {
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
                holdgoldSeat,
                holdSilverSeat,
                holdVipSeat,
                holdbronzeSeat,
            } = req.body;

            let CreateSeat = await seattModel.create({
                eventCategory, holdgoldSeat,
                holdSilverSeat, holdVipSeat,
                holdbronzeSeat, silverSeat,
                goldSeat, bronzeSeat,
                vipSeat, goldSeatPrice,
                silverSeatPrice, bronzeSeatPrice,
                vipSeatPrice, eventId, userId
            });
            if (CreateSeat) {
                var EventgoldSeat = CreateSeat.goldSeat
                var ablivalegoldSeat = CreateSeat.goldSeat - CreateSeat.holdgoldSeat
                var TotalseatType = (+CreateSeat.silverSeat) + (+CreateSeat.goldSeat) +
                    (+CreateSeat.bronzeSeat) + (+CreateSeat.vipSeat)

                var EventSilverSeat = CreateSeat.silverSeat
                var ablivalesilverSeat = CreateSeat.silverSeat - CreateSeat.holdSilverSeat
                var TotalseatType = (+CreateSeat.silverSeat) + (+CreateSeat.goldSeat) +
                    (+CreateSeat.bronzeSeat) + (+CreateSeat.vipSeat)

                var EventBronzSeat = CreateSeat.bronzeSeat
                var ablivalebronzeSeat = CreateSeat.bronzeSeat - CreateSeat.holdbronzeSeat
                var TotalseatType = (+CreateSeat.silverSeat) + (+CreateSeat.goldSeat) +
                    (+CreateSeat.bronzeSeat) + (+CreateSeat.vipSeat)

                var EventVipSeat = CreateSeat.vipSeat
                var ablivalevipSeat = CreateSeat.vipSeat - CreateSeat.holdVipSeat
                var TotalseatType = (+CreateSeat.silverSeat) + (+CreateSeat.goldSeat) +
                    (+CreateSeat.bronzeSeat) + (+CreateSeat.vipSeat)


                let contactUs = await bookseat.Auth.create({
                    userId,
                    totalSeatType: TotalseatType,
                    ablivaleSeatGold: ablivalegoldSeat,
                    ablivaleSeatSilver: ablivalesilverSeat,
                    ablivaleSeatVip: ablivalevipSeat,
                    ablivaleSeatBronze: ablivalebronzeSeat,
                    eventgoldSeat: EventgoldSeat,
                    eventSilverSeat: EventSilverSeat,
                    eventBronzSeat: EventBronzSeat,
                    eventVipSeat: EventVipSeat,
                    goldseathold: holdgoldSeat,
                    silverseathold: holdSilverSeat,
                    vipseathold: holdVipSeat,
                    bronzseathold: holdbronzeSeat
                });
            }
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

    getAllseat: async (req, res) => {
        const AllContacts = await bookseat.Auth.find({})
        res.status(200).json({ AllContacts })
    },

}