const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const sitSchema= new Schema({
    sitNumber:{
        type:String,
        // trim: true,
        required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
   
    sitName:{
        type:String,
        required:true,
        // minlength:3,
    },
    // contactNumber:{
    //     type:String,
    //     // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    //     required: [true, 'User phone number required']
    // },
    totalSit:{
        type:String,
        required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    totalSitSilver:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    totalSitGold:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    totalPrice:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    goldPrice:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    silverPrice:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    bronzePrice:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    vipPrice:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    totalSitBronze:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    totalSitVip:{
        type:String,
        // required:true,
        // minlength:[3,'Name cannot be less than 3 char`s'],
        // maxlength: [100, "Name can not be more than 100 characters"],
    },
    sitLocation: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    qrImg:{
        type:String,
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
    sitType:{
        type:String,
        enum:["GOLD","VIP","BRONZE","SILVER"],
        default:"GOLD"
    },
    sitStatus:{
        type:String,
        enum:["EMPTY","BOOKED","PENDING"],
        default:"EMPTY"
    },
    eventCategory:{
        type:String,
        enum:["CHURCH","THEATRE","STANDING","STADIUM"],
        default:"THEATRE"
     }
},
{ timestamps: true }
);

sitSchema.plugin(mongoosePaginate) 
const sitModel = mongoose.model('sit',sitSchema);
module.exports = sitModel


   