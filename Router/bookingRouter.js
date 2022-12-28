const router =  require('express').Router();
const BookingSeat = require('../controller/seatbookingController')
router.post("/bookseat",BookingSeat.bookseat)
router.get("/getseat/:id",BookingSeat.getseat)
router.get("/getallseat",BookingSeat.getAllseat)
router.post("/userseatbook",BookingSeat.userseatbook)
router.get("/getAlluserSeat",BookingSeat.getAlluserSeat)

// router.get('/geteventById1/:eventId',sitRouter.wishListGet)


module.exports =router
