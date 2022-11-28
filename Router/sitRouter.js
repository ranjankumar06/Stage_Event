const router =  require('express').Router();
const sitRouter = require('../controller/sitController')
router.post("/addSit",sitRouter.addSit)
router.get("/allSitDetails",sitRouter.allSitDetails)
router.post("/addSit1",sitRouter.addSit1)
router.get('/geteventById1',sitRouter.geteventById1)


module.exports =router
