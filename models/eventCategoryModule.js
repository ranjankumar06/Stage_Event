const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
//const mongoosePaginate = require('mongoose-paginate')
const eventCategoryschema= new Schema({
    eventCategoryName:{
        type:String,
        required:true,
     }
},
{ timestamps: true }

);

//sitSchema.plugin(mongoosePaginate) 
const eventCategoryModel = mongoose.model('eventcategory',eventCategoryschema);
module.exports = eventCategoryModel
   


   