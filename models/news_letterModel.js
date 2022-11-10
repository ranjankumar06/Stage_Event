const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true,'please provide valid email'],
        lowercase: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      startDate_Time: [{
        type: Date,
        default: Date.now,
      }]
});

module.exports =  mongoose.model("News Letter", newsLetterSchema);