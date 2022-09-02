const eventCategoryModel = require('../models/eventCategoryModule');
module.exports =
{
    addCategory:async(req,res)=>{
        try {
            // console.log(req,res);
            let {  
                
                eventCategoryName } = req.body;
            
            let data = await eventCategoryModel.create({
                eventCategoryName
            });
            
       res.status(200).json( {success:true,result:data} );
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
   
    getCategory:async(req,res)=>{
        try {
           
            const data = await eventCategoryModel.find({})
            res.status(200).json( {success:true,result:data} );
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
    
}