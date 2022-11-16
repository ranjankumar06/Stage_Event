const router =  require('express').Router();
const contactUsRouter = require('../controller/contactUsController')
router.post("/addContact",contactUsRouter.addContact)
router.get("/allContact",contactUsRouter.allContact)
router.get("/subjectSearch",contactUsRouter.subjectSearch)



module.exports =router
