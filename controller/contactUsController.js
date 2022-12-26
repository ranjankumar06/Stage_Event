const contactUsModel = require('../models/contactUsModel');
const addressModel = require('../models/addressModel')
module.exports =
{
    addContact: async (req, res) => {
        try {
            // console.log(req,res);
            let { name, email, subject, message, contactNumber, remark,EventId,UserId,userType,status } = req.body;

            let contactUs = await contactUsModel.create({
                name,
                email,
                subject,
                message,
                contactNumber,
                remark,
                UserId,
                EventId,
                status,
                userType
            });

            res.status(200).json({ success: true, message: 'contact save succesfully', contactUs });
            // return res.send({reponseCode:200,responseMessage:'Messege send',result:contactUs})                          


        } catch (error) {
            console.log(error);
            res.status(501).json({ success: false, message: "Something went wrong" })
        }
    },
    allContact: async (req, res) => {
        const AllContacts = await contactUsModel.find({})
        res.status(200).json({ AllContacts })
    },

    subjectSearch: async (req, res) => {
        try {
            const user = await contactUsModel.find({ "subject": req.query.subject });
            if (user) {
                res.json({
                    success: true,
                    message: 'Subject data find successfully',
                    AllContacts: user
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'Subject not found...',
                });
            }
        } catch (error) {
            res
                .status(404)
                .json({ success: false, message: "Oops! Something Went Wrong." });
        }
    },

    getContectById: async (req, res) => {
        try {
            let AllContacts = await contactUsModel.findById(req.params.id);

            res.status(200).json({ AllContacts })

        } catch (error) {
            console.log(error)
        }
    },

    UpdateContect: async (req, res) => {
        try {
            const _id = req.params.id
            const update = await contactUsModel.findByIdAndUpdate(_id, req.body)
            res.status(200).json({ update })
        }
        catch (error) {
            return res.status(500).json({
                status: 0,
                message: "something went wrong",
            });
        }
    },


}