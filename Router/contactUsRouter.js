const router =  require('express').Router();
const contactUsRouter = require('../controller/contactUsController')
router.post("/addContact",contactUsRouter.addContact)
router.get("/allContact",contactUsRouter.allContact)
router.get("/subjectSearch",contactUsRouter.subjectSearch)
router.get('/getContectById/:id',contactUsRouter.getContectById)
router.patch('/UpdateContect/:id',contactUsRouter.UpdateContect)



module.exports =router
