const router =  require('express').Router();
const BookingSeat = require('../controller/seatbookingController')
router.post("/bookseat",BookingSeat.bookseat)
router.get("/getseat/:id",BookingSeat.getseat)
router.get("/getallseat",BookingSeat.getAllseat)

// router.post("/addSit1",sitRouter.addSit1)
// router.get('/geteventById1/:eventId',sitRouter.wishListGet)


module.exports =router
