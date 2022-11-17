const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const contactUsSchema= new Schema({
    name:{
        type:String,
        trim: true,
        required: [true, "Please provide name"],
        minlength:[3,'Name cannot be less than 30 char`s'],
        maxlength: [600, "Name can not be more than 600 characters"],
    },
    email:{
        type:String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    subject:{
        type:String,
        required:true,
        minlength:3,
    },
    contactNumber:{
        type:String,
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required: [true, 'User phone number required']
    },
    message:{
        type:String,
        required:true,
        minlength:[3,'Name cannot be less than 3 char`s'],
        maxlength: [100, "Name can not be more than 100 characters"],
    },
    remark:{
        type:String
      },     
    // status:{
    //     type:String,
    //     enum:["ACTION","BLOCK","DELETE"],
    //     default:"ACTION"
    // },
    // userType:{
    //     type:String,
    //     enum:["USER","ORGANIZER"],
    //     default:"USER"
    // }
},
{ timestamps: true }
);

contactUsSchema.plugin(mongoosePaginate) 
const contactUsModel = mongoose.model('contactUs',contactUsSchema);
module.exports = contactUsModel


   