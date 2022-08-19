const router =  require('express').Router();
const bankdetailsRouter = require('../controller/bankdetailsController')
router.post("/addBankDetails",bankdetailsRouter.addBankDetails)
router.get("/allBankDetails",bankdetailsRouter.allBankDetails)


module.exports =router
