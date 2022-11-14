const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate')
const organizerSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  mobileNumber: {
    type: String
  },
  profilePic: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  searchDate: {
    type: [String],
  },

  otp: {
    type: String
  },
  otpExpireTime: {
    type: Number,
    allowNull: true
  },
  otpVerify: {
    type: Boolean,
    default: false
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'address'
  },
  status: {
    type: String,
    enum: ["ACTION", "BLOCK", "DELETE"],
    default: "ACTION"
  },
  userType: {
    type: String,
    enum: ["USER", "ORGANIZER", "ADMIN"],
    default: "ORGANIZER"
  },
  NameCompany: {
    type: String
  },
  ContactPerson: {
    type: String
  },
  Landmark: {
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

organizerSchema.plugin(mongoosePaginate)
const organizerModel = mongoose.model('organizer', organizerSchema);
module.exports = organizerModel


organizerModel.findOne(
  { status: { $ne: "DELETE" }, userType: "ADMIN" },
  (userErr, userRes) => {
    if (userErr) {
    } else if (userRes) {
      console.log("Default admin already exist");
    } else {
      let admin = {
        firstName: "Ravi",
        lastName: "rai",
        email: "raviprarai@gmail.com",
        mobileNumber: 1234567890,
        password: bcrypt.hashSync("12345678901"),
        userType: "ADMIN",
        otpVerify: true,
      };
      organizerModel(admin).save((saveErr, saveAdmin) => {
        if (saveErr) {
        } else {
          console.log("Default admin created");
        }
      });
    }
  }
);