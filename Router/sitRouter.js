const router =  require('express').Router();
const sitRouter = require('../controller/sitController')
router.post("/addSeat",sitRouter.addSeat)
router.get("/allSitDetails",sitRouter.allSitDetails)
router.patch('/seatUpdate/:id',sitRouter.seatUpdate)



module.exports =router
