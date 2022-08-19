const router =  require('express').Router();
const contactUsRouter = require('../controller/contactUsController')
router.post("/addContact",contactUsRouter.addContact)
router.get("/allContact",contactUsRouter.allContact)


module.exports =router
