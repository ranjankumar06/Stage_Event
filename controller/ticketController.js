const eventModel = require('../models/eventModel')
const organizerModel = require('../models/organizerModel');
const commonFunction = require('../helper/commonFunction');
const userModel = require('../models/userModel');
const ticketModel = require('../models/ticketModel');
const qrCode = require('qrcode')


module.exports={
    ticketBook:async(req,res)=>{
        // try {
        //     let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
        //     let user = await userModel.findOne(query);
        //     if (!user) {
        //         return res.send({ reponseCode: 404, responseMessage: 'User not found .', responseResult: [] });
        //     } else {
        //     let query1= { $and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } },{ userType: 'USER' },], };
        //     let data= await eventModel.findOne(query1)
        //     if (data) {
        //         if (data.slots.length==1) {
        //         return res.send({ reponseCode: 404, responseMessage: 'ticket are not available .', responseResult: [] });
        //         } else {
        //             const bookingFind = await ticketModel.findOne({userId:user._id})
                     

        //             if (bookingFind) {
        //             return res.send({ reponseCode: 404, responseMessage: 'you are already booked a Ticket .', responseResult: [] });
        //             } else {
        //                 const r = req.body.slotDate
        //                 const d = new Date().toISOString().split('T')[0];
        //                 if (r==d) {
        //                     let day =new Date(r)
        //                     let sun =day.getDay()
        //                     if (sun!=0) {
        //                         const d1 = new Date().toLocaleTimeString()
        //                         if (req.body.slotTime>=d1) {  
        //                             const bsData = ({ $and: [{ slotTime: req.body.slotTimes }, { bookingDate: r }] });
        //                             const bookData = await ticketModel.findOne(bsData)
        //                             if (bookData) {
        //                                 return res.send({ responseCode: 401, responseMessage: "Ticket Are Already Booked" });
        //                             } else {
        //                                 req.body.userId = user._id
        //                                 req.body.email = user.email
        //                                 req.body.slotEvent=data.eventName
        //                                 req.body.serialNo = (a.slice(0,3))+"-"+commonFunction.generatedSNo(await ticketModel.count())
        //                                let stringData = JSON.stringify(user)

        //                                 let qr = await qrCode.toDataURL(stringData)
        //                                 let qrImage =await commonFunction.uploadImage(qr)
        //                                req.body.qrImg=qrImage
        //                                const bookingSave = await ticketModel(req.body).save()
        //                                 subject = "Book Ticket";
        //                                 text = `Your Book ticket Id is  ${bookingSave._id} .You are wait for confimation `;
        //                                 const mail = await commonFunction.sendMail(user.email, subject, text)
        //                                 if (mail) {
        //                                     return res.send({ responseCode: 200, responseMessage: "Booking Successfully", responseResult: bookingSave });
        //                                 } else {
        //                                     return res.send({ responseCode: 401, responseMessage: "Booking Failed" });
        //                                 }
        //                             }
        //                         }else{
        //                             return res.send({reponseCode:404,responseMessage:'you enter time before current time',result:[]})    
        //                         }
        //                     } else {
        //                         return res.send({reponseCode:404,responseMessage:'Booking not allowed on sunday',result:[]})    
        //                     } 
        //                 }else if(new Date(r)>new Date(d)){
        //                     let day =new Date(r)
        //                     let sun =day.getDay()
        //                     if (sun!=0) {
        //                                 const bsData = ({ $and: [{ slotTime: req.body.slotTimes }, { bookingDate: r }] });
        //                                 const bookData = await ticketModel.findOne(bsData)
        //                                 if (bookData) {
        //                                     return res.send({ responseCode: 401, responseMessage: "Slots Are Already Booked" });
        //                                 } else {
        //                                 req.body.userId = user._id
        //                                 req.body.email = user.email
        //                                 const bookingSave = await ticketModel(req.body).save()
        //                                 subject = "Book";
        //                                 text = `Your Slot Booking Id is  ${bookingSave._id} .You are wait for confimation `;
        //                                 const mail = await commonFunction.sendMail(user.email, subject, text)
        //                                 if (mail) {
        //                                     return res.send({ responseCode: 200, responseMessage: "Booking Successfully", responseResult: bookingSave });
        //                                 } else {
        //                                     return res.send({ responseCode: 401, responseMessage: "Booking Failed" });
        //                                 }
        //                             }  
        //                     } else {
        //                     return res.send({reponseCode:404,responseMessage:'Booking not allowed on sunday',result:[]})    
        //                     } 
        //                 } else {
        //                 return res.send({reponseCode:404,responseMessage:'you enter past date',result:[]})
        //                 }
        //             }
        //         }
        //     } else {
        //     return res.send({reponseCode:404,responseMessage:'Event not found',result:[]})
        //     }
        // }
        // } catch (error) {
        //     return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        // }


        try {
            let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'User not found .', responseResult: [] });
            } else {
            let query1= { $and: [{centerName:req.body.centerName}, { status: { $ne: "DELETE" } },], };
            let data= await centerModel.findOne(query1)
            if (data) {
                if (data.slots.length==1) {
                return res.send({ reponseCode: 404, responseMessage: 'slots are not available .', responseResult: [] });
                } else {
                    const bookingFind = await bookingModel.findOne({userId:user._id})
                    if (bookingFind) {
                    return res.send({ reponseCode: 404, responseMessage: 'you are already booked a vaccine slot .', responseResult: [] });
                    } else {
                        const r = req.body.slotDate
                        const d = new Date().toISOString().split('T')[0];
                        if (r==d) {
                            let day =new Date(r)
                            let sun =day.getDay()
                            if (sun!=0) {
                                const d1 = new Date().toLocaleTimeString()
                                if (req.body.slotTime>=d1) {  
                                    const bsData = ({ $and: [{ slotTime: req.body.slotTimes }, { bookingDate: r }] });
                                    const bookData = await bookingModel.findOne(bsData)
                                    if (bookData) {
                                        return res.send({ responseCode: 401, responseMessage: "Slots Are Already Booked" });
                                    } else {
                                        req.body.userId = user._id
                                        req.body.email = user.email
                                        req.body.slotCenter=data.centerName
                                        const bookingSave = await bookingModel(req.body).save()
                                        subject = "Appointment";
                                        text = `Your Slot Booking Id is  ${bookingSave._id} .You are wait for confimation `;
                                        const mail = await commonFunction.sendMail(user.email, subject, text)
                                        if (mail) {
                                            return res.send({ responseCode: 200, responseMessage: "Booking Successfully", responseResult: bookingSave });
                                        } else {
                                            return res.send({ responseCode: 401, responseMessage: "Booking Failed" });
                                        }
                                    }
                                }else{
                                    return res.send({reponseCode:404,responseMessage:'you enter time before current time',result:[]})    
                                }
                            } else {
                                return res.send({reponseCode:404,responseMessage:'Booking not allowed on sunday',result:[]})    
                            } 
                        }else if(new Date(r)>new Date(d)){
                            let day =new Date(r)
                            let sun =day.getDay()
                            if (sun!=0) {
                                        const bsData = ({ $and: [{ slotTime: req.body.slotTimes }, { bookingDate: r }] });
                                        const bookData = await bookingModel.findOne(bsData)
                                        if (bookData) {
                                            return res.send({ responseCode: 401, responseMessage: "Slots Are Already Booked" });
                                        } else {
                                        req.body.userId = user._id
                                        req.body.email = user.email
                                        const bookingSave = await bookingModel(req.body).save()
                                        subject = "Appointment";
                                        text = `Your Slot Booking Id is  ${bookingSave._id} .You are wait for confimation `;
                                        const mail = await commonFunction.sendMail(user.email, subject, text)
                                        if (mail) {
                                            return res.send({ responseCode: 200, responseMessage: "Booking Successfully", responseResult: bookingSave });
                                        } else {
                                            return res.send({ responseCode: 401, responseMessage: "Booking Failed" });
                                        }
                                    }  
                            } else {
                            return res.send({reponseCode:404,responseMessage:'Booking not allowed on sunday',result:[]})    
                            } 
                        } else {
                        return res.send({reponseCode:404,responseMessage:'you enter past date',result:[]})
                        }
                    }
                }
            } else {
            return res.send({reponseCode:404,responseMessage:'center not found',result:[]})
            }
        }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    ticketApprove:async(req,res)=>{
        try {
            let query= { $and: [{ _id:req.dataId}, { status: { $ne: "DELETE" } }, { userType:'ORGANIZER'}, ]};
            let data=await organizerModel.findOne(query)
            if (data) {
                var bookingApprove = await ticketModel.findOne({ $and: [{ _id:req.body._id}, { status: { $ne: "DELETE" } }, ]});
                if (!bookingApprove) {
                    return res.send({ responseCode: 409, responseMessage: "Booking data is not exist" });
                } else {
                    if (bookingApprove.status == "PENDING") {
                        subject = "Booking";
                        text = `Your Booking ID: ${req.body._id} .your approved successfully and you are going to Event`;
                        const mail = await commonFunction.sendMail(bookingApprove.email, subject, text)
                        if (mail) {
                           let bd= await ticketModel.findByIdAndUpdate({ _id: bookingApprove._id }, { $set: { status: "BOOKED" } }, { new: true });
                            if (bd) {
                            return res.send({ responseCode: 200, responseMessage: "Ticket Approve Successfully", responseResult: bd });
                            } else {
                                return res.send({ responseCode: 404, responseMessage: "Ticket Approve Failed", responseResult: [] });   
                            }
                        }
                    } else {
                        return res.send({ responseCode: 200, responseMessage: "Already approved" });
                    }
                }
            } else {
                return res.send({reponseCode:404,responseMessage:'you are not organizer',result:[]})
            }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    viewTicketDetails:async(req, res) => {
        try {
            let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'User not found .', responseResult: [] });
            } else {
                let bookData = await ticketModel.findOne({ $and:[{_id: req.body._id}, {status: "BOOKED" }]});
                if (bookData) {
                    return res.send({ responseCode: 200, responseMessage: "Ticket booking details", responseResult: bookData })
                } else {
                    return res.send({ responseCode: 200, responseMessage: "your ticket are in pending/delete",responseResult:[] })
                }
            }
        } catch (error) {
            console.log(error)
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },

    bookingTicketList:async(req,res)=>{
        try {
            let query1 = { $and: [{ _id:req.dataId}, { status: { $ne: "DELETE" } },{userType:"ADMIN"}], };
                let admin1 = await userModel.findOne(query1); 
                if(!admin1){
                    return res.send({responseCode:404,responseMessage:'Admin not found!',responseResult:[]})
                }else{
                    let query = {  status: { $ne: "DELETE" } };
                    if(req.query.search){
                        query.$or=[ 
                            {_id:{$regex:req.query.search,$option:'i'}},
                        ]
                    }
                    let options = {
                        page: parseInt(req.query.page) || 1,
                        limit: parseInt(req.body.limit) || 10,
                    };
                    let slotData = await ticketModel.paginate(query,options);
                    if(slotData.docs.length==0){
                        return res.send({responseCode:404,responseMessage:'Booking ticket data not found!',responseResult:[]})
                    }else{
                        return res.send({responseCode:200,responseMessage:'Booking ticket data found!',responseResult:slotData})
                    }
                }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    updateBooking:async(req,res)=>{
        try {
            let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'User not found .', responseResult: [] });
            } else {
            let query1= { $and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } },], };
            let data= await eventModel.findOne(query1)
            if (data) {
                if (data.slots.length==1) {
                return res.send({ reponseCode: 404, responseMessage: 'Ticket are not available .', responseResult: [] });
                } else {
                    const bookingFind = await ticketModel.findOne({userId:user._id})
                    if (!bookingFind) {
                    return res.send({ reponseCode: 404, responseMessage: 'Ticket book are not exists', responseResult: [] });
                    } else {
                        const r = req.body.slotDate
                        const d = new Date().toISOString().split('T')[0];
                        if (r==d) {
                            let day =new Date(r)
                            let sun =day.getDay()
                            if (sun!=0) {
                                const d1 = new Date().toLocaleTimeString()
                                if (req.body.slotTime>=d1) {  
                                    const bsData = ({ $and: [{ slotTime: req.body.slotTimes }, { bookingDate: r }] });
                                    const bookData = await ticketModel.findOne(bsData)
                                    if (bookData) {
                                        return res.send({ responseCode: 401, responseMessage: "Ticket Are Already Booked" });
                                    } else {
                                        req.body.userId = user._id
                                        req.body.email = user.email
                                        req.body.slotEvent = data.eventName
                                        let stringData = JSON.stringify(user)
                                        let qr = await qrCode.toDataURL(stringData)
                                        let qrImage =await commonFunction.uploadImage(qr)
                                       req.body.qrImg=qrImage
                                        const bookingSave = await ticketModel(req.body).save()
                                        subject = "Booking";
                                        text = `Your Slot Booking Id is  ${bookingSave._id} .You are wait for confimation `;
                                        const mail = await commonFunction.sendMail(user.email, subject, text)
                                        if (mail) {
                                            return res.send({ responseCode: 200, responseMessage: "Booking Update Successfully", responseResult: bookingSave });
                                        } else {
                                            return res.send({ responseCode: 401, responseMessage: "Booking Failed" });
                                        }
                                    }
                                }else{
                                    return res.send({reponseCode:404,responseMessage:'you enter time before current time',result:[]})    
                                }
                            } else {
                                return res.send({reponseCode:404,responseMessage:'Booking not allowed on sunday',result:[]})    
                            } 
                        }else if(new Date(r)>new Date(d)){
                            let day =new Date(r)
                            let sun =day.getDay()
                            if (sun!=0) {
                                        const bsData = ({ $and: [{ slotTime: req.body.slotTimes }, { bookingDate: r }] });
                                        const bookData = await ticketModel.findOne(bsData)
                                        if (bookData) {
                                            return res.send({ responseCode: 401, responseMessage: "Ticket Are Already Booked" });
                                        } else {
                                        req.body.userId = user._id
                                        req.body.email = user.email
                                        const bookingSave = await ticketModel(req.body).save()
                                        subject = "Booking";
                                        text = `Your Slot Booking Id is  ${bookingSave._id} .You are wait for confimation `;
                                        const mail = await commonFunction.sendMail(user.email, subject, text)
                                        if (mail) {
                                            return res.send({ responseCode: 200, responseMessage: "Booking Update Successfully", responseResult: bookingSave });
                                        } else {
                                            return res.send({ responseCode: 401, responseMessage: "Booking Failed" });
                                        }
                                    }  
                            } else {
                            return res.send({reponseCode:404,responseMessage:'Booking not allowed on sunday',result:[]})    
                            } 
                        } else {
                        return res.send({reponseCode:404,responseMessage:'you enter past date',result:[]})
                        }
                    }
                }
            } else {
            return res.send({reponseCode:404,responseMessage:'Event not found',result:[]})
            }
        }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    cancelTcketByUser:async(req,res)=>{
        try {
            let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (user) {
                let slotData=await ticketModel.findOne({$and:[{_id: req.body._id}, {status: "BOOKED" }]})
                if (slotData) {
                    let delSlot =await ticketModel.deleteOne({_id:slotData._id})
                    if (delSlot) {
                        return res.send({reponseCode:200,responseMessage:'ticket cancel successfully',result:[]})
                    }
                } else {
                    return res.send({reponseCode:404,responseMessage:'ticket not found',result:[]})
                }
            }else{
                return res.send({reponseCode:404,responseMessage:'user not found',result:[]})
            }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    cancelTicketByOrganizer:async(req,res)=>{
        try {
            let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: "ORGANIZER" }], };
            let user = await organizerModel.findOne(query);
            if (user) {
                let slotData=await ticketModel.findOne({$and:[{_id: req.body._id}, {status: "BOOKED" }]})
                if (slotData) {
                    let delSlot =await ticketModel.deleteOne({_id:slotData._id})
                    if (delSlot) {
                        return res.send({reponseCode:200,responseMessage:'Ticket cancel successfully',result:[]})
                    }
                } else {
                    return res.send({reponseCode:404,responseMessage:'ticket not found',result:[]})
                }
            }else{
                return res.send({reponseCode:404,responseMessage:'user not found',result:[]})
            }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
}




