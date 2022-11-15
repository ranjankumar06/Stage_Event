const router=require('express').Router()
const newsletter=require('../controller/NewsLetter')

router.post('/addSubscription',newsletter.addSubscription)

router.get('/getAllUserSubscription',newsletter.getAllUserSubscription)

router.get('/EmailSearch',newsletter.EmailSearch)


module.exports=router