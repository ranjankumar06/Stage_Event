const express = require('express');
const ObjectId = require("mongoose").Types.ObjectId;

const wishlist = require('../models/wishlistModel');


// Get all wishlist Based on User Id
module.exports = {
    wishListGet: async (req, res) => {
        const userId = req.params.userId;
        wishlist.aggregate([{
            $lookup: {
                from: 'events',
                localField: 'productId',
                foreignField: '_id',
                as: 'event'
            }
        },
        { $unwind: '$event' },
        { $unset: 'productId' },
        {
            $match: {
                userId: ObjectId(userId)
            }
        }]).then(data => {
            res.status(200).json({ success: true, msg: "All event in your wishlisty", data: data });
        }).catch(err => {
            res.status(400).json(err);
        });
    },


    addWishlist: async (req, res) => {
        let model = new wishlist(req.body);
        wishlist.findOne({
            $and: [
                { "userId": req.body.userId },
                { "productId": req.body.productId },
            ]
        }, (err, info) => {
            console.log(info);
            if (err) {
                res.status(400).send(err.message);
            } else {
                if (info == null) {
                    model.save((err, data) => {
                        if (err) {
                            res.status(400).send(err.message);
                        } else {
                            res.status(200).json({
                                success: true,
                                message: 'Event Has Been Added To The WishList',
                                data: data
                            });
                        }
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: 'Event Has Been Already Added in WishList'
                    })
                }
            }

        });
    }
}

// // Get Caregory wise wishlist Based on User Id
// router.get('/getWishlist/:filter/:userId', (req, res) => {
//     const userId = req.params.userId;
//     const filter = req.params.filter;

//     wishlist.aggregate([{
//         $lookup: {
//             from: 'group1',
//             localField: 'productId',
//             foreignField: '_id',
//             as: 'group1'
//         }
//     }, 
//     { $unwind: '$product' },
//     { $unset: 'productId' },
//     {
//         $match: {
//             userId: ObjectId(userId),
//             'product.category': filter
//         }
//     }]).then(data => {
//         res.status(200).json(data);
//     }).catch(err => {
//         res.status(400).send(err);
//     });
// });

// /* 
// {
//     "userId": "609ab05eabddac700c9e5420",
//     "productId": "609961b081f2da5ce0a67dcf"
// }
// */



// router.delete('/deleteWishlist/:id', (req, res) => {
//     const id = req.params.id;
//     wishlist.findByIdAndDelete(id, (err, data) => {
//         if (err) {
//             res.status(400).send(err.message);
//         } else {
//             res.status(200).json("Product Has Been Removed From The WishList");
//         }
//     });
// });


