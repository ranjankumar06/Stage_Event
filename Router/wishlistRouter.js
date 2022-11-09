const router =  require('express').Router();
const wishlist = require('../controller/wishlist')
const auth = require('../middleware/auth')

router.get("/getWishlist/:userId",wishlist.wishListGet)

router.post("/addWishlist",wishlist.addWishlist)

router.delete("/deleteWishlist/:id",wishlist.deleteWishlist)


module.exports =router