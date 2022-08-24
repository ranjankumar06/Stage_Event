const addressModel = require('../models/addressModel')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
const commonFunction = require('../helper/commonFunction');
const organizerModel = require('../models/organizerModel');
const ticketModel = require('../models/ticketModel');


module.exports =
{
    OrganizerSignUp:async(req, res)=>
    {
        try
        {
            let result = await organizerModel.findOne({$and:[{$or:[{email:req.body.email},{mobileNumber:req.body.mobileNumber}]},{status:{$ne:"DELETE"}}, { userType:{$ne:"USER"}}],},)
            if (result) {
                if(result.email == req.body.email){
                    return res.send({reponseCode:409,responseMessage:'Email already exists',result:[]})
                }
                else{
                    if(result.mobileNumber== req.body.mobileNumber)
                    {
                        return res.send({reponseCode:409,responseMessage:'Mobile number already exists',result:[]})
                    }
                }
            }
                else
                {
                    req.body.otp = commonFunction.otp();
                    req.body.otpExpireTime=Date.now()+5*60*1000;
                    let password = req.body.password;
                    let conpass  = req.body.confirmPassword
                    if(password!=conpass)
                    {
                        res.send({reponseCode:401,responseMessage:'password do not match.',})
                    }
                    else{
                        req.body.password=bcrypt.hashSync(password)
                        // let profilePic=req.file.path
                        // req.body.profilePic = await commonFunction.uploadImage(profilePic);
                        // req.body.profilePic = req.body.profilePic
                        let subject = 'signUP OTP';
                        let text = `Your OTP : ${req.body.otp}`;
                        let mail = await commonFunction.sendMail(req.body.email,subject,text,)
                        if(mail){
                        let OrganizerSave = await  new organizerModel(req.body).save()
                            if (OrganizerSave) {
                                req.body.organizerId=OrganizerSave._id;
                                let saveAddress = await new addressModel(req.body).save();
                                if(saveAddress){
                                let updateOrganizer = await organizerModel.findByIdAndUpdate({_id:OrganizerSave._id},{$set:{addressId:saveAddress._id,otp:req.body.otp}},{new:true})
                                if (updateOrganizer) {
                                return res.send({reponseCode:200,responseMessage:'Signup successfully',result:updateOrganizer,saveAddress})                          
                                   }
                                }
                            }
                        }
                    }
                }
        }
        catch(error)
        {
            return res.send({reponseCode:501,responseMessage:'Something went worng',result:error.message})
        }
    },
    OrganizerOtpVerify:async (req,res)=>
    {
        try 
        {
           let resultVerify =await organizerModel.findOne({$and:[{$or:[{email:req.body.email}]},{status:{$ne:"DELETE"}}, { userType:{$ne:"USER"}}],},)
                     if(!resultVerify){
                       return res.send({reponseCode:404,responseMessage:'Organizer not found',responseResult:[]},);
                    } else {
                        if (resultVerify.otpVerify == true) {
                            return res.send({ responseCode: 409, responseMessage: 'Organizer already verified.', responseResult: resultVerify })
                            }
                        else{ 
                            let currentTime =Date.now();
                            if(req.body.otp==resultVerify.otp){
                                if(resultVerify.otpExpireTime>=currentTime){
                              let resVerify = await organizerModel.findByIdAndUpdate({_id:resultVerify._id},{$set:{otpVerify: true}},{new:true},)
                                        if (resVerify) {
                                            return res.send({reponseCode:200,responseMessage:'Organizer verify successfully',result:[]},);
                                        }
                            }else{
                                    res.send({reponseCode:410,responseMessage:'OTP is Expired',result:[]},);
                                   }
                            }else{
                                res.send({reponseCode:400,responseMessage:'Wrong OTP',result:[]},);
                            }

                      }
                    }
        } catch (er) 
        {
           return res.send({reponseCode:501,responseMessage:'Something went worng',result:er.message})
       }
    },
    OrganizerResendOtp:async(req,res)=>{
        try {
            let query ={$and:[{email:req.body.email},{status:{$ne:"DELETE"}},],}; 
            let organizerResult = await organizerModel.findOne(query);
            if (!organizerResult) {
                return res.send({reponseCode:404,responseMessage:'Organizer not found .',responseResult:[],});
            } else {
                if(organizerResult.otpVerify==true){
                    return res.send({reponseCode:401,responseMessage:'Organizer already verified',responseResult:[]},);
                }else{
                let otp = commonFunction.otp();
                let expireTime = Date.now()+5*60*1000;
                let subject = 'OTP for verify';
                let text = `${otp}`;
                let mailResult = await  commonFunction.sendMail(organizerResult.email,subject,text);
                if(mailResult){
                    let updateOrganizer = await organizerModel.findByIdAndUpdate({_id:organizerResult._id},{$set:{otpVerify:false,otp:otp,otpExpireTime:expireTime}},{new:true})
                    if(updateOrganizer){
                        return res.send({reponseCode:200,responseMessage:'OTP send successfully .',responseResult:updateOrganizer,});
                    }
                }
            }
            }          
        } catch (error) {
            return res.send({reponseCode:501,responseMessage:'Something went wrong .',responseResult:error.message,});
        }
    },
    OrganizerLogin:async(req,res)=>{
        try{
          let query = {$and:[{$or:[{email:req.body.email},{mobileNumber:req.body.email}]},{status:{$ne:"DELETE"}}, { userType:{$ne:"USER"}}],}
          let organizerResult = await organizerModel.findOne(query);
          if(!organizerResult){
            return res.send({reponseCode:404,responseMessage:'Organizer not found .',responseResult:[],});
          }
          else{
            if(organizerResult.otpVerify==false){
                return res.send({reponseCode:401,responseMessage:'Organizer not verified',responseResult:[]},);
            }
            else{
                let passCheck = bcrypt.compareSync(req.body.password,organizerResult.password);
                if(passCheck==false){
                  return res.send({reponseCode:401,responseMessage:'Incorrect password.',})
                }
                else{
                    let dataToken = {userId:organizerResult._id,email:organizerResult.email}
                      let token = jwt.sign(dataToken,'test',{expiresIn:'1h'})
                  return res.send({reponseCode:200,responseMessage:'login Successfully',responseResult:organizerResult,token},); 
                }
            }
          }
        }catch(error)
        {
          return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    OrganizerForgotPassword:async(req,res)=>{
        try{
          let query = {$and:[{email:req.body.email},{status:{$ne:"DELETE"}}, { userType:{$ne:"USER"}}],};
          let organizerResult = await organizerModel.findOne(query);
          if(!organizerResult){
            return res.send({reponseCode:404,responseMessage:'Organizer not found .',responseResult:[],});
          }
          else{
            let otpForgot = commonFunction.otp()
            req.body.otpExpireTime=Date.now()+5*60*1000;
            let otpTime = req.body.otpExpireTime
            let subject = 'OTP varification for forgot password';
            let text = `Your OTP for verification : ${otpForgot}`;
            let send = await commonFunction.sendMail(req.body.email,subject,text,)
            if(send){
                let otpUpdate = await organizerModel.findOneAndUpdate({_id:organizerResult._id},{$set:{otp:otpForgot,otpVerify:false,otpExpireTime:otpTime}},{new:true})
                if(otpUpdate){
                    return res.send({reponseCode:200,responseMessage:'OTP send successfully',result:otpUpdate},); 
                }
            }
          }
        }catch(error)
        {
          return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    OrgotpVerifyForget:async (req,res)=>
    {
        try 
        {
           let resultVerify =await organizerModel.findOne({$and:[{$or:[{email:req.body.email},{ _id:req.body._id}]},{status:{$ne:"DELETE"}},{ userType:{$ne:"USER"}}],},)
                     if(!resultVerify){
                       return res.send({reponseCode:404,responseMessage:'Organizer not found',responseResult:[]},);
                    } else {
                        if (resultVerify.otpVerify == true) {
                            return res.send({ responseCode: 409, responseMessage: 'Organizer already verified.', responseResult: resultVerify })
                            }
                        else{ 
                            let currentTime =Date.now();
                            if(req.body.otp==resultVerify.otp){
                                if(resultVerify.otpExpireTime>=currentTime){
                              let resVerify = await organizerModel.findByIdAndUpdate({_id:resultVerify._id},{$set:{otpVerify: true}},{new:true},)
                                        if (resVerify) {
                                            return res.send({reponseCode:200,responseMessage:'Organizer verify successfully',result:[]},);
                                        }
                            }else{
                                    res.send({reponseCode:410,responseMessage:'OTP is Expired',result:[]},);
                                   }
                            }else{
                                res.send({reponseCode:400,responseMessage:'Wrong OTP',result:[]},);
                            }

                      }
                    }
        } catch (er) 
        {
           return res.send({reponseCode:501,responseMessage:'Something went worng',result:er.message})
       }
    },
    OrganizerGetProfile:async(req,res)=>{
        try{
            let query = { _id:req.params._id, status: { $ne: "DELETE" },   userType:{$ne:"USER"} };
            let organizerResult = await organizerModel.findOne(query)
            if (!organizerResult) {
                return res.send({ reponseCode: 404, responseMessage: 'User not found .', responseResult: [], });
            }
            else {
                  const data = await organizerModel.findOne({_id:organizerResult._id}).populate('addressId')  
                  if(data){
                return res.send({ reponseCode: 200, responseMessage: 'Profile fetched successfully.', responseResult: data });
                  }
            }
        }catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong!", responseResult: error.message });
        }
    },
    OrganizerEditProfile: async(req,res)=>{
        try {
            let query = { $and: [{email:req.body.email}, { status: { $ne: "DELETE" } }, { userType:{$ne:"USER"}}], };
            let organizer = await organizerModel.findOne(query);
            if (!organizer) {
                return res.send({ reponseCode: 404, responseMessage: 'Organizer not found .', responseResult: [] });
            } else {
                    // let profilePic=req.file.path
                    // req.body.profilePic = await commonFunction.uploadImage(profilePic);
                    // req.body.profilePic = req.body.profilePic
                    let updateOrganizer = await organizerModel.findByIdAndUpdate({ _id: organizer._id }, { $set: req.body }, { new: true })
                    if (updateOrganizer) {
                        req.body.userId=updateOrganizer._id;
                                let saveAddress = await new addressModel(req.body).save();
                                if(saveAddress){
                                let updateOrganizers = await organizerModel.findByIdAndUpdate({_id:updateOrganizer._id},{$set:{addressId:saveAddress._id}},{new:true})
                                if(updateOrganizers){
                        return res.send({ reponseCode: 200, responseMessage: 'Succesfully updated', responseResult: updateOrganizers });
                    }
                }
                }
                else {
                    if (req.body.email == userCheck.email) {
                        return res.send({ reponseCode: 409, responseMessage: 'Email already in use.', responseResult: [] });
                    }
                }
            }
        } catch (error) {
            return res.send({ reponseCode: 501, responseMessage: 'Something went wrong', responseResult: error.message });
        }
    },
    OrganizerResetPassword:async(req,res)=>{
         try {
                let query = {$and:[{$or:[{email:req.body.email},],},{status:{$ne:"DELETE"}},{ userType:{$ne:"USER"}}],};
                let organizerResult = await organizerModel.findOne(query);
                if(!organizerResult){
                  return res.send({reponseCode:404,responseMessage:'Organizer not found .',responseResult:[],});
                }
                else{
                        // let currentTime =Date.now();
                        // if(req.body.otp==userResult.otp)
                        
                            // if(userResult.otpExpireTime>=currentTime)
                    //   const data = await userModel.findOne({email:req.body.email})  
                    let newPassword = req.body.newPassword;
    
                                req.body.newPassword=bcrypt.hashSync(newPassword)
                                let userUpdate =await organizerModel.findByIdAndUpdate({_id:organizerResult._id},{$set:{password:req.body.newPassword}},{new:true})   
                                    if (userUpdate) {
                                        return res.send({reponseCode:200,responseMessage:'Reset password successfully',result:userUpdate});
                                    }
                        
                         
                }   
            } catch (error) {
                return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
            }
        
},
    OrganizerChangePassword:async(req,res)=>{
        try {
            let query = { $and: [{email:req.body.email}, { status: { $ne: "DELETE" } },  { userType:{$ne:"USER"}}], };
            let organizerResult1 = await organizerModel.findOne(query);
            if(!organizerResult1){
              return res.send({reponseCode:404,responseMessage:'Organizer not found .',responseResult:[],});
            }
            else{
                let passCheck = bcrypt.compareSync(req.body.password,organizerResult1.password);
                if(passCheck==false){
                  return res.send({reponseCode:401,responseMessage:'Incorrect password.',})
                }
                else{   
                    let newPassword = req.body.newPassword;
                    let confirmNewPassword  = req.body.confirmNewPassword
                    if(newPassword!=confirmNewPassword)
                    {
                        res.send({reponseCode:401,responseMessage:'password do not match.',})
                    }
                    else{
                        req.body.newPassword=bcrypt.hashSync(newPassword)
                    let organizerUpdate =await organizerModel.findByIdAndUpdate({_id:organizerResult1._id},{$set:{password:req.body.newPassword,}},{new:true})   
                        if (organizerUpdate) {
                            return res.send({reponseCode:200,responseMessage:'Password changed successfully',result:organizerUpdate},);
                        }
                    }
                }
            }               
        } catch (error) {
            return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
        }
    },
    // OrganizerViewEvent: async (req, res) => {
    //     try {
    //         let query = { $and: [{_id:req.params._id }, { status: { $ne: "DELETE" } },  { userType:{$ne:"USER"}}], };
    //       let organizersData = await organizerModel.findOne(query);
    //       if(!organizersData){
    //         res.send({responseCode:404,responseMessage: "Organizer Event data not found",responseResult:[]})
    //       }else{
    //         let organizerData = await organizerModel.paginate(query,{populate: 'addressId'});
    //         if(organizerData.docs.length!=0){
    //             res.send({responseCode:200,responseMessage:'Organizer Event  data found!',responseResult:organizerData})
    //         }      
    //       }
    //     } catch (error) {
    //       return res.send({responseCode: 501,responseMessage: "Something went wrong!",responseResult: error.message,});
    //     }
    // },
    listOrganizer:async (req,res)=>{
        try {
            let query = { $and: [{ status: { $ne: "DELETE" } }, { userType: 'ORGANIZER' }], };
            if(req.query.search){
                query.$or=[ 
                    {name:{$regex:req.query.search,$option:'i'}},
                    {email:{$regex:req.query.search,$option:'i'}},
                ]
            }
            let options = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.body.limit) || 10,
                populate: 'addressId',
                sort: { createdAt: -1},
            };
            let userData = await organizerModel.paginate(query,options);
            if(userData.docs.length==0){
                res.send({responseCode:404,responseMessage:'Organizer not found!',responseResult:[]})
            }else{
                res.send({responseCode:200,responseMessage:'Organizer found!',responseResult:userData})
            }
        } catch (error) {
        res.send({responseCode:501,responseMessage:'Something went wrong!',responseResult:error.message})
        }
    },

  
}

    
