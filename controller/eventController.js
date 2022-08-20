const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');
const organizerModel = require('../models/organizerModel');
const commonFunction = require('../helper/commonFunction');
const multer = require('multer');

// const commonDate = require('../helper/date');

const addressModel = require('../models/addressModel')
const download = require('image-downloader');

// const stats = require('../models/stats');
// const utils = require('../lib/utils');



module.exports ={
    addEvent:async(req,res)=>{
        // try {
        //     let query= { $and: [{email:req.body.email}, { status: { $ne: "DELETE" } }, { userType:{$ne:"USER"}}, ]};
        //     let data=await organizerModel.findOne(query)
        //     if (data){
        //     let query1= { $and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } },], };
        //     let EventAdd= await eventModel.findOne(query1)
        //     if (EventAdd) {
        //         return res.send({reponseCode:409,responseMessage:'Event already exists',result:[]})
        //     } else {
        //         // let image = [];
        //         //         for (let index = 0; index < req.files.length; index++) {
        //         //             let f = await commonFunction.uploadImage(req.files[index].path);
        //         //             image.push(f);
        //         //         }
        //         //         req.body.eventImages=image
        //         let stime = new Date()
        //         stime.setHours(09)+stime.setMinutes(00)+stime.setSeconds(00)
        //         let startTime= stime.toLocaleTimeString()
        //         req.body.openingTime=startTime
        //         let eTime= new Date()
        //         eTime.setHours(05)+eTime.setMinutes(00)+eTime.setSeconds(00)
        //         let endTime= eTime.toLocaleTimeString()
        //         req.body.closingTime=endTime
        //         req.body.slots= await commonFunction.generateSlots()
        //         let saveEvent = await  new eventModel(req.body).save()
        //         if (saveEvent) {
        //             let saveAddress = await new addressModel(req.body).save();
        //             if(saveAddress){
        //                 let updateEvent = await eventModel.findByIdAndUpdate({_id:saveEvent._id},{$set:{addressId:saveAddress._id}},{new:true})
        //                 if (updateEvent) {
        //                     return res.send({reponseCode:200,responseMessage:'Event add successfully',result:updateEvent,saveAddress})                          
        //                 }
        //             }
        //         }
        //     } 
        //     }else{
        //         return res.send({reponseCode:404,responseMessage:'you are not admin or organizer',result:[]})
        //     }
        // } catch (error) {
        //     return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        // }
        try {
            let query= { $and: [{email:req.body.email}, { status: { $ne: "DELETE" } }, { userType:{$ne:"USER"}}, ]};
             let data=await organizerModel.findOne(query)
            if (data){
            let query1= {$and:[{$or:[{eventName:req.body.eventName}]},{status:{$ne:"DELETE"}}],};
            let centerAdd= await eventModel.findOne(query1)
            if (centerAdd) {
                return res.send({reponseCode:409,responseMessage:'Event already exists',result:[]})
            } else {
                let image = [];
                        for (let index = 0; index < req.files.length; index++) {
                            let f = await commonFunction.uploadImage(req.files[index].path);
                            image.push(f);
                        }
                        req.body.eventImage=image
                let stime = new Date()
                // stime.setHours(08)+stime.setMinutes(00)+stime.setSeconds(00)
                let startTime= stime.toLocaleTimeString()
                req.body.openingTime=startTime
                let eTime= new Date()
                // eTime.setHours(06)+eTime.setMinutes(00)+eTime.setSeconds(00)
                let endTime= eTime.toLocaleTimeString()
                req.body.closingTime=endTime
                // req.body.slots= await commonFunction.generateSlots()
                let saveCenter = await  new eventModel(req.body).save()
                if (saveCenter) {
                    let saveAddress = await new addressModel(req.body).save();
                    if(saveAddress){
                        let updateCenter = await eventModel.findByIdAndUpdate({_id:saveCenter._id},{$set:{addressId:saveAddress._id}},{new:true})
                        if (updateCenter) {
                            return res.send({reponseCode:200,responseMessage:'Event add successfully',result:updateCenter,saveAddress})                          
                        }
                    }
                }
            } 
            }else{
                return res.send({reponseCode:404,responseMessage:'you are not admin or organizer',result:[]})
            }
        } catch (error) {
            console.log(error);
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }

    },
    eventView:async(req,res)=>{
        try {
            let query = { $and: [{_id:req.dataId}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'User not found .', responseResult: [] });
            } else {
                let EventData = await eventModel.findOne({$and: [{_dataId:req.body._dataId}, { status: { $ne: "DELETE" } },],});
            if(!EventData){
                res.send({responseCode:404,responseMessage:'Event not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Event found Successfully',responseResult:EventData})
            }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },
    updateEvent:async (req,res)=>{
        // try {
        //     let query= { $and: [{ _id:req.dataId}, { status: { $ne: "DELETE" } }, { userType:{$ne:"USER"}}, ]};
        //     let data=await organizerModel.findOne(query)
        //     if (data){
        //     let eventUp= await eventModel.findOne({ $and: [{_id:req.body._id}, { status: { $ne: "DELETE" } },], })
        //     if (!eventUp) {
        //         return res.send({reponseCode:404,responseMessage:'EVENT NOT FOUND',result:[]})
        //     } else {
        //         let stime = new Date()
        //         stime.setHours(08)+stime.setMinutes(00)+stime.setSeconds(00)
        //         let startTime= stime.toLocaleTimeString()
        //         req.body.openingTime=startTime
        //         let eTime= new Date()
        //         eTime.setHours(06)+eTime.setMinutes(00)+eTime.setSeconds(00)
        //         let endTime= eTime.toLocaleTimeString()
        //         req.body.closingTime=endTime
        //         req.body.slots= await commonFunction.generateSlots()
        //         let saveEvent = await eventModel.findByIdAndUpdate({_id:eventUp._id},{$set:req.body},{new:true})
        //         if (saveEvent) {
        //             let saveAddress = await new addressModel(req.body).save();
        //             if(saveAddress){
        //                 let updateEvent = await eventModel.findByIdAndUpdate({_id:saveEvent._id},{$set:{addressId:saveAddress._id}},{new:true})
        //                 if (updateEvent) {
        //                     return res.send({reponseCode:200,responseMessage:'Event Update successfully',result:updateEvent,saveAddress})                          
        //                 }
        //             }
        //         }
        //     } 
        //     }else{
        //         return res.send({reponseCode:404,responseMessage:'you are not admin or organizer',result:[]})
        //     }
        // } catch (error) {
        //     return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        // }


        try {
            let query= { $and: [{ email:req.body.email},{eventName:req.body.eventName}, { status: { $ne: "DELETE" } }, { userType:{$ne:"USER"}}, ]};
            let data=await organizerModel.findOne(query)
            if (data){
            let centerUp= await eventModel.findOne({ $and: [{email:req.body.email},{eventName:req.body.eventName}, { status: { $ne: "DELETE" } },], })
            if (!centerUp) {
                return res.send({reponseCode:404,responseMessage:'EVENT NOT FOUND',result:[]})
            } else {
                let image = [];
                        for (let index = 0; index < req.files.length; index++) {
                            let f = await commonFunction.uploadImage(req.files[index].path);
                            image.push(f);
                        }
                        req.body.eventImage=image
                let stime = new Date()
                // stime.setHours(09)+stime.setMinutes(00)+stime.setSeconds(00)
                let startTime= stime.toLocaleTimeString()
                req.body.openingTime=startTime
                let eTime= new Date()
                // eTime.setHours(06)+eTime.setMinutes(00)+eTime.setSeconds(00)
                let endTime= eTime.toLocaleTimeString()
                req.body.closingTime=endTime
                // req.body.slots= await commonFunction.generateSlots()
                let saveCenter = await eventModel.findByIdAndUpdate({_id:centerUp._id},{$set:req.body},{new:true})
                if (saveCenter) {
                    let saveAddress = await new addressModel(req.body).save();
                    if(saveAddress){
                        let updateCenter = await eventModel.findByIdAndUpdate({_id:saveCenter._id},{$set:{addressId:saveAddress._id}},{new:true})
                        if (updateCenter) {
                            return res.send({reponseCode:200,responseMessage:'EVENT Update successfully',result:updateCenter,saveAddress})                          
                        }
                    }
                }
            } 
            }else{
                return res.send({reponseCode:404,responseMessage:'you are not admin or organizer',result:[]})
            }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
     EventList:async(req,res)=>{
        try {
            let query = { status: { $ne: "DELETE" } };
            if(req.query.search){
                query.$or=[ 
                    {eventName:{$regex:req.query.search,$option:'i'}},
                ]
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.body.limit) || 10,
            };
            let eventData = await eventModel.aggregatePaginate(options);
            if(eventData.docs.length==0){
                res.send({responseCode:404,responseMessage:'Event data not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'event data found successfully',responseResult:eventData})
            }
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    deleteEvent:async(req,res)=>{
        try {
            let query= { $and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } }, { userType:{$ne:"USER"}}, ]};
            let data=await organizerModel.findOne(query)
            if (!data) {
                return res.send({reponseCode:404,responseMessage:'you are not admin or user',result:[]})
            } else {
                let query = { $and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } },], };
                let dEvent = await eventModel.findOne(query);
                if (!dEvent) {
                    return res.send({responseCode:404,responseMessage:'Event not found!',responseResult:[]})
                } else {
                    let updateEvent = await eventModel.findByIdAndUpdate({_id:dEvent._id},{$set:{status:"DELETE"}},{new:true})
                    if (updateEvent) {
                        return res.send({responseCode:200,responseMessage:'Event delete successfully',responseResult:[]})  
                    }
                }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },
    allUpcomingEvent:async(req,res)=>{
         try {
            let query = { $and: [{ status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            if(req.query.search){
                query.$or=[ 
                    {eventName:{$regex:req.query.search,$option:'i'}},
                    // {email:{$regex:req.query.search,$option:'i'}},
                ]
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.body.limit) || 10,
                populate: 'addressId',
                sort: { createdAt: -1},
            };
            let userData = await eventModel.paginate(query,options);
            if(userData.docs.length==0){
                res.send({responseCode:404,responseMessage:'Event data not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Event data found!',responseResult:userData})
            }
        } catch (error) {
        res.send({responseCode:501,responseMessage:'Something went wrong!',responseResult:error.message})
        }
    },
    searchUpcomingByName:async(req,res)=>{
        try {
            let query = { $and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'Upcoming not found .', responseResult: [] });
            } else {
                let EventData = await eventModel.findOne({$and: [{eventName:req.body.eventName}, { status: { $ne: "DELETE" } },],});
            if(!EventData){
                res.send({responseCode:404,responseMessage:'Upcoming not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Upcoming found Successfully',responseResult:EventData})
            }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },
    searchUpcomingByArtistName:async(req,res)=>{
        try {
            let query = { $and: [{artistName:req.body.artistName}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'Upcoming not found .', responseResult: [] });
            } else {
                let EventData = await eventModel.findOne({$and: [{artistName:req.body.artistName}, { status: { $ne: "DELETE" } },],});
            if(!EventData){
                res.send({responseCode:404,responseMessage:'Upcoming not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Upcoming found Successfully',responseResult:EventData})
            }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },
    searchUpcomingByCountry:async(req,res)=>{
        try {
            let query = { $and: [{country:req.body.country}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'Upcoming not found .', responseResult: [] });
            } else {
                let EventData = await eventModel.findOne({$and: [{country:req.body.country}, { status: { $ne: "DELETE" } },],});
            if(!EventData){
                res.send({responseCode:404,responseMessage:'Upcoming not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Upcoming found Successfully',responseResult:EventData})
            }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },
    searchUpcomingByCity:async(req,res)=>{
        try {
            let query = { $and: [{city:req.body.city}, { status: { $ne: "DELETE" } }, { userType: 'USER' }], };
            let user = await userModel.findOne(query);
            if (!user) {
                return res.send({ reponseCode: 404, responseMessage: 'Upcoming not found .', responseResult: [] });
            } else {
                let EventData = await eventModel.findOne({$and: [{city:req.body.city}, { status: { $ne: "DELETE" } },],});
            if(!EventData){
                res.send({responseCode:404,responseMessage:'Upcoming not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Upcoming found Successfully',responseResult:EventData})
            }
            }
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "somehting went wrong", responseResult: error.message });
        }
    },
 

}
