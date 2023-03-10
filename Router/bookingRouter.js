const router =  require('express').Router();
const BookingSeat = require('../controller/seatbookingController')

const multer = require('multer')
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads')
    // },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
const upload = multer({storage:storage})

// router.post("/bookseat",BookingSeat.bookseat)
// router.post("/userseatbook",BookingSeat.userseatbook)

router.get("/getseat/:id",BookingSeat.getseat)
router.get("/getAlluserSeat",BookingSeat.getAlluserSeat)
router.post("/ticketBook",upload.array('image'),BookingSeat.userseatbook)

module.exports =router
