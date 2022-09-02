const router =  require('express').Router();
const eventRouter = require('../controller/eventController')
const auth = require('../middleware/auth')
const multer = require('multer')
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads')
    // },
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
router.put('/updateEvent',upload.array('image',15),eventRouter.updateEvent)
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
router.get('/allUpcomingEvent',eventRouter.allUpcomingEvent)
router.get('/searchUpcomingByName',eventRouter.searchUpcomingByName)
router.get('/searchUpcomingByArtistName',eventRouter.searchUpcomingByArtistName)

router.get('/searchUpcomingByCountry',eventRouter.searchUpcomingByCountry)
router.get('/searchUpcomingByCity',eventRouter.searchUpcomingByCity)
router.get('/geteventById/:id',eventRouter.geteventById)
// router.get('/searchByDate',eventRouter.searchByDate)

// router.post('/search', async (req, res, next) => {
//   const body = req.body;

//   if(typeof body.year === 'undefined' || typeof body.month === 'undefined' || typeof body.day === 'undefined') {
//       return res.json({
//           error: 'Missing required parameters.'
//       });
//   }

//   const { year, month, day } = body;


//   if(!utils.validYear(year)) {
//       return res.json({
//           error: 'Invalid year parameter.'
//       });
//   }

//   if(!utils.validValue(month, 'month')) {
//       return res.json({
//           error: 'Invalid month parameter.'
//       });
//   }

//   if(!utils.validValue(day, 'day')) {
//       return res.json({
//           error: 'Invalid day parameter.'
//       });
//   }

//   const dateStart = new Date();

//   dateStart.setUTCFullYear(parseInt(year, 10));
//   dateStart.setUTCMonth(parseInt(month, 10));
//   dateStart.setUTCDate(parseInt(day, 10));

//   dateStart.setUTCHours(0, 0, 0);

//   const dateMax = new Date();

//   dateMax.setUTCFullYear(parseInt(year, 10));
//   dateMax.setUTCMonth(parseInt(month, 10));
//   dateMax.setUTCDate(parseInt(day, 10));
//   dateMax.setUTCHours(23, 59, 59);

//   try {
//       const query = { date: {
//               $gte: dateStart, $lte: dateMax
//       } };
//       const results = await stats.find(query);
//       res.json(results);
//   } catch (err) {
//       res.json(err);
//   }
// });





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
// router.get('/upcomingeventsbycategory',eventRouter.upcomingeventsbycategory)


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
// router.get('/completeEvent/:_id',eventRouter.completeEvent)
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
// router.get('/completedeventsbycategory',eventRouter.completedeventsbycategory)

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
// router.get('/liveEvent/:_id',eventRouter.liveEvent)
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
// router.get('/liveeventsbycategory',eventRouter.liveeventsbycategory)

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
//  router.get('/cancelEvent/:_id',eventRouter.cancelEvent)
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
//  router.get('/ canceleventsbycategory',eventRouter. canceleventsbycategory)

// router.get('/concartEvent/:_id',eventRouter.concartEvent)
// router.get('/sportEvent/:_id',eventRouter.sportEvent)





module.exports =router
