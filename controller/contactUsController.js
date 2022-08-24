const contactUsModel = require('../models/contactUsModel');
const addressModel = require('../models/addressModel')
module.exports =
{
    addContact:async(req,res)=>{
        try {
            // console.log(req,res);
            let {  name,email, subject, description, contactNumber } = req.body;
            
            let contactUs = await contactUsModel.create({
             name,
             email,
             subject,
             description,
             contactNumber,
            });
            
       res.status(200).json( contactUs );
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
    allContact:async(req,res)=>{
        const AllContacts = await contactUsModel.find({})
        res.status(200).json({AllContacts})
    }
    
}