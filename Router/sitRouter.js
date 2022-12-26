const router =  require('express').Router();
const sitRouter = require('../controller/sitController')
router.post("/addSeat",sitRouter.addSeat)
// router.get("/allSitDetails",sitRouter.allSitDetails)
// router.post("/addSit1",sitRouter.addSit1)
// router.get('/geteventById1/:eventId',sitRouter.wishListGet)


module.exports =router
