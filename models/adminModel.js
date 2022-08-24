const mongoose = require('mongoose');
// const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')
const adminSchema= new Schema({
    name: { type: String,required: true },
    email: { type: String,required: true },
    password: { type: String, required: true },
    status:{
        type:String,
        enum:["ACTION","BLOCK","DELETE"],
        default:"ACTION"
    },
    userType:{
        type:String,
        enum:["USER","ORGANIZER","ADMIN"],
        default:"ADMIN"
    }
},

);

adminSchema.plugin(mongoosePaginate)  
const adminModel = mongoose.model('admin',adminSchema);
module.exports = adminModel
