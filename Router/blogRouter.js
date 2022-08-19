const router =  require('express').Router();
const blogRouter = require('../controller/blogController')
router.post("/addBlog",blogRouter.addBlog)
router.get("/allBlog",blogRouter.allBlog)


module.exports =router
