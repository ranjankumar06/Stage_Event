const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate');
// const { defaultMaxListeners } = require('nodemailer/lib/xoauth2');
const bankdetailsSchema= new Schema({
    cardNumber:{
        type:String,
        required:true,
        minlength:[10,'cardNumber cannot be less than 10 Number'],
        maxlength: [20, "cardNumber can not be more than 20 Number"],

    },
    accountNumber:{
        type:String,
        required:true,
        minlength:[10,'accountNumber cannot be less than 10 Number'],
        maxlength: [20, "accountNumber can not be more than 20 Number"],

    },
    nameOnCard:{
        type:String,
        required: [true, "Please provide nameOnCard"],
        minlength:[3,'nameOnCard cannot be less than 3 char`s'],
        maxlength: [20, "nameOnCard can not be more than 20 characters"],

    },
    expiryDate:{
        type:String,
        required:true,


    },
    cvv:{
        type:String,
        required:true,
        maxlength:[3,'Name cannot be greater than 3 Number'],


    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:'address'
      },     
    status:{
        type:String,
        enum:["ACTION","BLOCK","DELETE"],
        default:"ACTION"
    },
    userType:{
        type:String,
        enum:["USER","ORGANIZER"],
        default:"USER"
    },
    paymentType:{
        type:String,
        enum:["ONLINE","CASE ON DELIVERY"],
        default:"ONLINE"
    }
},
{ timestamps: true }
);

bankdetailsSchema.plugin(mongoosePaginate) 
const bankdetailsModel = mongoose.model('bankdetails',bankdetailsSchema);
module.exports = bankdetailsModel


   