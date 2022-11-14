const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const organiserSchema = new Schema({
    NameCompany: {
        type: String
    },
    ContactPerson: {
        type: String
    },
    Country: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    Landmark: {
        type: String
    },
    Phone: {
        type: String
    },
    Fax: {
        type: String,
    },
    Taxnumber: {
        type: String,
    },
    ResponsibleTaxOfficeHamburg: {
        type: String,
    },
    EmailForEbilling: {
        type: [String],
    },
    Bankdetails: {
        type: String
    },
    IBAN: {
        type: Number,
        allowNull: true
    },
    TourPromoter: {
        type: Boolean,
        default: false
    },
    NameCompanyName: {
        type: String
    },
    LocalPromote: {
        type: String,
    },
    ZIPCity: {
        type: String,
    }
},
    { timestamps: true }
);

organiserSchema.plugin(mongoosePaginate)
const organiserModel = mongoose.model('organiser', organiserSchema);
module.exports = userModel


