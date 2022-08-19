const blogModel = require('../models/blogModel');

module.exports =
{
    addBlog:async(req,res)=>{
        try {
            // console.log(req,res);
            let {  autherName, tittle, description} = req.body;
            
            let blog = await blogModel.create({
                autherName,
            //  email,
            tittle,
             description,
            //  contactNumber,
            });
            
       res.status(200).json( blog );
    // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          

            
        } catch (error) {
            console.log(error);
            res.status(501).json({success:false, message:"Something went wrong"})
        }
    },
    allBlog:async(req,res)=>{
        const r = await blogModel.find({})
        res.status(200).json({r})
    }
    
}