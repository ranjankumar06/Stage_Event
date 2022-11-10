const router=require('express').Router()
const newsletter=require('../controller/NewsLetter')

router.post('/addSubscription',newsletter.addSubscription)

router.get('/getAllUserSubscription',newsletter.getAllUserSubscription)

module.exports=router