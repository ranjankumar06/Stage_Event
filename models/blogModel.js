const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const blogSchema= new Schema({
    autherName:{
        type:String,
        trim: true,
        required: [true, "Please provide name"],
        minlength:[3,'Name cannot be less than 3 char`s'],
        maxlength: [100, "Name can not be more than 100 characters"],
    },
   
    tittle:{
        type:String,
        required:true,
        minlength:3,
    },
    // contactNumber:{
    //     type:String,
    //     // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    //     required: [true, 'User phone number required']
    // },
    description:{
        type:String,
        required:true,
        minlength:[3,'Name cannot be less than 3 char`s'],
        maxlength: [600, "Name can not be more than 100 characters"],
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
    }
},
{ timestamps: true }
);

blogSchema.plugin(mongoosePaginate) 
const blogModel = mongoose.model('blog',blogSchema);
module.exports = blogModel


   