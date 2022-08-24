const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
const organizerModel = require('../models/organizerModel')

module.exports = {
   jwtToken:async(req,res,next)=>{
      try{ 
          let decode = await jwt.verify(req.headers.token,'test');
      if(decode){
        let data = await userModel.findOne({$or:[{_id:decode.userId,userType:'USER'},{_id:decode.organizerId,userType:'ORGANIZER'}]});
        if(data){
         if(data.status=='BLOCK'){
           res.send({responseMessage:'BLOCK'})
         }
         else if(data.status=='DELETE'){
           res.send({responseMessage:'DELETE'})
         }
         else{
           req.dataId=data._id;
           next()   
         }
        } 
      }
    }catch(error){
       return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
      }
   },
   
  subJwtToken:async(req,res,next)=>{
    try{ 
        let decode = await jwt.verify(req.headers.token,'test');
    if(decode){
      let data = await organizerModel.findOne({$or:[{_id:decode.adminId,userType:'ADMIN'}]});
      if(data){
       if(data.status=='BLOCK'){
         res.send({responseMessage:'BLOCK'})
       }
       else if(data.status=='DELETE'){
         res.send({responseMessage:'DELETE'})
       }
       else{
         req.dataId=data._id;
         next()   
       }
      } 
    }
  }catch(error){
     return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
    }
 }
  }