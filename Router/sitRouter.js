const router =  require('express').Router();
const sitRouter = require('../controller/sitController')
router.post("/addSit",sitRouter.addSit)
router.get("/allSitDetails",sitRouter.allSitDetails)
module.exports =router
