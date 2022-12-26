const eventModel = require('../models/eventModel')
const organizerModel = require('../models/organizerModel');
const commonFunction = require('../helper/commonFunction');
const userModel = require('../models/userModel');
const ticketModel = require('../models/ticketModel');
// const sitModel = require('../models/sitModel');
const addressModel = require('../models/addressModel')
// const sitModel = require('../models/sitModel');



const qrCode = require('qrcode')


module.exports = {
    ticketBook: async (req, res) => {
        try {
            let query1 = { $and: [{ $or: [{ _id: req.dataId }] }, { status: { $ne: "DELETE" } }, { userType: { $ne: "ADMIN" } }], }
            let admin = await userModel.findOne(query1);
            if (admin) {
                let query = { $and: [{ eventName: req.body.eventName }, { status: { $ne: "DELETE" } }, { userType: { $ne: "ADMIN" } }], };
                let machineResult = await eventModel.findOne(query);
                if (!machineResult) {
                    let counter = req.body.counter
                    console.log(req.body.counter)
                    if (counter > 4) {
                        return res.send({ reponseCode: 400, responseMessage: 'counter limit exceed', result: [] })
                    }
                    else {

                        // let data1 = await new ticketModel.findOne(req.body.userId,req.body.user._id).save()

                        req.body.serialNo = await commonFunction.generatedSNo(await ticketModel.count())

                        req.body.eventName = req.body.eventName
                        req.body.slotDate = req.body.slotDate
                        req.body.slotTime = req.body.slotTime
                        // let user=req.body.user
                        // req.body.userId = user._id

                        // req.body.email = user.email
                        const bookingSave = await ticketModel(req.body).save()

                        // subject = "booking";
                        // text = `Your Slot Booking Id is${bookingSave} .You are wait for confimation `;
                        // const mail = await commonFunction.sendMail(req.body.email, subject, text,bookingSave)
                        let data = await new ticketModel(req.body).save()
                        if (data) {
                            req.body.ticketId = data._id;
                            let saveAddress = await new addressModel(req.body).save();
                            if (saveAddress) {
                                let updateMac = await ticketModel.findByIdAndUpdate({ _id: data._id }, { $set: { addressId: saveAddress._id } }, { new: true })
                                if (updateMac) {
                                    let stringData = JSON.stringify(updateMac)
                                    let qr = await qrCode.toDataURL(stringData)
                                    let qrImage = await commonFunction.uploadImage(qr)
                                    let updater = await ticketModel.findByIdAndUpdate({ _id: updateMac._id }, { $set: { qrImg: qrImage } }, { new: true })
                                    if (updater) {
                                        return res.send({ reponseCode: 200, responseMessage: 'ticket booking successfully', responseResult: updater, saveAddress })
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    return res.send({ reponseCode: 409, responseMessage: 'event name already exists', result: [] })
                }
            }
        } catch (error) {
            return res.send({ reponseCode: 501, responseMessage: 'Something went worng', result: error.message })
        }


    },

    viewTicketDetails: async (req, res) => {
        try {
            let query = { $and: [{ eventName: req.body.eventName }, { status: { $ne: "DELETE" } }, { userType: { $ne: "ADMIN" } }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'ticket  not found .', responseResult: [] });
            } else {
                let EventData = await ticketModel.findOne({ $and: [{ eventName: req.body.eventName }, { status: { $ne: "DELETE" } },], });
                if (!EventData) {
                    res.send({ responseCode: 404, responseMessage: 'ticket not found!', responseResult: [] })
                } else {
                    res.send({ responseCode: 200, responseMessage: 'ticket found Successfully', responseResult: EventData })
                }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },

    bookingTicketList: async (req, res) => {
        try {
            let query1 = { $and: [{ status: { $ne: "DELETE" } }, { userType: { $ne: "ADMIN" } }], };
            let admin1 = await userModel.findOne(query1);
            if (!admin1) {
                return res.send({ responseCode: 404, responseMessage: 'user not  found!', responseResult: [] })
            } else {
                let query = { status: { $ne: "DELETE" } };
                if (req.query.search) {
                    query.$or = [
                        { eventName: { $regex: req.query.search, $option: 'i' } },
                    ]
                }
                let options = {
                    page: parseInt(req.query.page) || 1,
                    limit: parseInt(req.body.limit) || 10,
                };
                let slotData = await ticketModel.paginate(query, options);
                if (slotData.docs.length == 0) {
                    return res.send({ responseCode: 404, responseMessage: 'Booking ticket data not found!', responseResult: [] })
                } else {
                    return res.send({ responseCode: 200, responseMessage: 'Booking ticket data found!', responseResult: slotData })
                }
            }
        } catch (error) {
            return res.send({ reponseCode: 501, responseMessage: 'Something went worng', result: error.message })
        }
    },
    updateBooking: async (req, res) => {

    },
    cancelTcketByUser: async (req, res) => {
        try {
            let query1 = { $and: [{ _id: req.dataId }, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let admin = await userModel.findOne(query1);
            if (admin) {
                let query = { $and: [{ eventName: req.body.eventName }, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
                let machine = await ticketModel.findOne(query);
                if (!machine) {
                    return res.send({ reponseCode: 404, responseMessage: 'ticket not found .', responseResult: [] });
                } else {
                    let stringData = JSON.stringify(machine)
                    let qr = await qrCode.toDataURL(stringData)
                    let qrImage = await commonFunction.uploadImage(qr)
                    let deleteMachine = await ticketModel.deleteOne({ _id: machine._id, qrImage })
                    if (deleteMachine) {
                        return res.send({ reponseCode: 200, responseMessage: 'ticket successfully cancel', result: machine })
                    }
                }
            }
        } catch (error) {
            return res.send({ reponseCode: 501, responseMessage: 'Something went worng', result: error.message })
        }
    },

}




