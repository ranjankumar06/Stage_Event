const router =  require('express').Router();
const eventRouter = require('../controller/eventController')
const multer = require('multer');
const auth = require('../middleware/auth')
var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
const upload = multer({storage:storage})

/**
* @swagger
* /event/addEvent:
*   post:
*     tags:
*       - EVENT MANAGEMENT
*     description: Creating Docs for EVENT
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: Token is required.
*         in: header
*         required: true
*       - name: eventName
*         description: event Name is required.
*         in: formData
*         required: true
*       - name: startDate
*         description: Start Date is required.
*         in: formData
*         required: true
*       - name: startTime
*         description: Start Time is required.
*         in: formData
*         required: true
*       - name: endDate
*         description: End Date is required.
*         in: formData
*         required: true
*       - name: endTime
*         description: End Time is required.
*         in: formData
*         required: true
*       - name: address
*         description: address is required.
*         in: formData
*         required: true
*       - name: contractNo
*         description: Contract Number is required.
*         in: formData
*         required: true
*       - name: coordinates
*         description: coordinates  is required.
*         in: formData
*         required: true
*       - name: street
*         description: street is required.
*         in: formData
*         required: false
*       - name: area
*         description: area is required.
*         in: formData
*         required: false
*       - name: city
*         description: city is required.
*         in: formData
*         required: false
*       - name: state
*         description: state is required.
*         in: formData
*         required: false
*       - name: country
*         description: country is required.
*         in: formData
*         required: false
*       - name: pin
*         description: pin is required.
*         in: formData
*         required: false
*       - name: price
*         description: price is required.
*         in: formData
*         required: true
*       - name: eventImages
*         description: eventImages is required.
*         in: formData
*         type: file
*         required: true
*       - name: description
*         description: description is required.
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.post('/addEvent',upload.array('image',15),eventRouter.addEvent)
/**
* @swagger
* /event/eventView:
*   put:
*     tags:
*       - EVENT MANAGEMENT
*     description: Creating Docs for EVENT
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: Token is required.
*         in: header
*         required: true
*       - name: _id
*         description: event Id is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get('/eventView',auth.jwtToken,eventRouter.eventView)
/**
* @swagger
* /event/updateEvent:
*   put:
*     tags:
*       - EVENT MANAGEMENT
*     description: Creating Docs for EVENT
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: Token is required.
*         in: header
*         required: true
*       - name: _id
*         description: event Id Name is required.
*         in: formData
*         required: true
*       - name: eventName
*         description: event Name is required.
*         in: formData
*         required: true
*       - name: contractNo
*         description: Contract Number is required.
*         in: formData
*         required: true
*       - name: coordinates
*         description: coordinates  is required.
*         in: formData
*         required: true
*       - name: street
*         description: street is required.
*         in: formData
*         required: false
*       - name: area
*         description: area is required.
*         in: formData
*         required: false
*       - name: city
*         description: city is required.
*         in: formData
*         required: false
*       - name: state
*         description: state is required.
*         in: formData
*         required: false
*       - name: country
*         description: country is required.
*         in: formData
*         required: false
*       - name: pin
*         description: pin is required.
*         in: formData
*         required: false
*       - name: price
*         description: price is required.
*         in: formData
*         required: true
*       - name: startDate
*         description: Start Date is required.
*         in: formData
*         required: true
*       - name: startTime
*         description: Start Time is required.
*         in: formData
*         required: true
*       - name: endDate
*         description: End Date is required.
*         in: formData
*         required: true
*       - name: endTime
*         description: End Time is required.
*         in: formData
*         required: true
*       - name: image
*         description: image is required.
*         in: formData
*         type: file
*         required: true
*       - name: description
*         description: description is required.
*         in: formData
*         required: false
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.put('/updateEvent',eventRouter.updateEvent)
/**
* @swagger
* /event/EventList:
*   get:
*     tags:
*       - EVENT MANAGEMENT
*     description: Creating Docs for EVENT
*     produces:
*       - application/json
*     parameters:
*       - name: eventName
*         description: eventName is required.
*         in: query
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get('/EventList',eventRouter.EventList)
/**
* @swagger
* /event/deleteEvent:
*   delete:
*     tags:
*       - EVENT MANAGEMENT
*     description: Creating Docs for EVENT
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: Token is required.
*         in: header
*         required: true
*       - name: eventName
*         description: eventName is required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.delete('/deleteEvent',eventRouter.deleteEvent)
/**
 * @swagger
 * /event/upcomingEvent:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
router.get('/upcomingEvent',eventRouter.upcomingEvent)
/**
 * @swagger
 * /event/upcomingeventsbycategory:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: event_category
 *         description: event_category is required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
router.get('/upcomingeventsbycategory',eventRouter.upcomingeventsbycategory)


/**
 * @swagger
 * /event/completeEvent:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
router.get('/completeEvent',eventRouter.completeEvent)
/**
 * @swagger
 * /event/completedeventsbycategory:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: event_category
 *         description: event_category is required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
router.get('/completedeventsbycategory',eventRouter.completedeventsbycategory)

/**
 * @swagger
 * /event/liveEvent:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
router.get('/liveEvent',eventRouter.liveEvent)
/**
 * @swagger
 * /event/liveeventsbycategory:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: event_category
 *         description: event_category is required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
router.get('/liveeventsbycategory',eventRouter.liveeventsbycategory)

/**
 * @swagger
 * /event/cancelEvent:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
 router.get('/cancelEvent',eventRouter.cancelEvent)
 /**
 * @swagger
 * /event/canceleventsbycategory:
 *   get:
 *     tags:
 *       - EVENT MANAGEMENT
 *     description: Creating Docs for EVENT
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: event_category
 *         description: event_category is required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Done successfully.
 *       404:
 *         description: DATA NOT FOUND.
 *       500:
 *         description: Internal server error.
 */
 router.get('/ canceleventsbycategory',eventRouter. canceleventsbycategory)





module.exports =router
