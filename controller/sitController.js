const sitModel = require('../models/sitModel');
module.exports =
{
    addSit:async(req,res)=>{
        try {
            // console.log(req,res);
            let {  sitName, totalSit,totalPrice, sitNumber,
                sitLocation,totalSitSilver,totalSitGold,totalSitBronze,
                totalSitVip, goldPrice,silverPrice,bronzePrice,vipPrice } = req.body;
            
            let contactUs = await sitModel.create({
            sitName,
             totalSit,
             sitNumber,totalPrice,
             sitLocation,totalSitSilver,totalSitGold,totalSitBronze,totalSitVip,
             goldPrice,silverPrice,bronzePrice,vipPrice
            });
            
       res.status(200).json( contactUs );
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
    allSitDetails:async(req,res)=>{
        const AllContacts = await sitModel.find({})
        res.status(200).json({AllContacts})
    }
}