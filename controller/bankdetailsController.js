const bankdetailsModel = require('../models/bankdetailsModel');
module.exports =
{
    addBankDetails:async(req,res)=>{
        try {
            // console.log(req,res);
            let {  nameOnCard,expiryDate, cvv, accountNumber, cardNumber } = req.body;
            
            let contactUs = await bankdetailsModel.create({
            nameOnCard,
            expiryDate,
            cvv,
            accountNumber,
            cardNumber,
            });
          
       res.status(200).json( contactUs );
       
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
    allBankDetails:async(req,res)=>{
        const AllContacts = await bankdetailsModel.find({})
        res.status(200).json({AllContacts})
    },
    updateBankDetails:async(req,res)=>{

    }
}