const router =  require('express').Router();
const ticketRouter = require('../controller/ticketController')
const auth = require('../middleware/auth')
/**
* @swagger
* /ticket/ticketBook:
*   post:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: User Token is required.
*         in: header
*         required: true
*       - name: eventName
*         description: Event Name is required.
*         in: formData
*         required: true
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: slotDate
*         description: Slot Date is required.
*         in: formData
*         required: true
*       - name: slotTime
*         description: Slot Time is required.
*         in: formData
*         required: true
*       - name: slotEvent
*         description: Slot Event is required.
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
router.post("/ticketBook",auth.jwtToken,ticketRouter.ticketBook)
/**
* @swagger
* /ticket/ticketApprove:
*   put:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: organizer Token is required.
*         in: header
*         required: true
*       - name: _id
*         description: Book Id is required.
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
router.put("/ticketApprove",auth.subJwtToken,ticketRouter.ticketApprove)
/**
* @swagger
* /ticket/viewTicketDetails:
*   get:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: User Token is required.
*         in: header
*         required: true
*       - name: _id
*         description: Book Id is required.
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
router.get("/viewTicketDetails",auth.jwtToken,ticketRouter.viewTicketDetails)
/**
* @swagger
* /ticket/updateBooking:
*   put:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: Token is required.
*         in: header
*         required: true
*       - name: eventName
*         description: Event Name is required.
*         in: formData
*         required: true
*       - name: slotDate
*         description: Slot Date is required.
*         in: formData
*         required: true
*       - name: slotTime
*         description: Slot Time is required.
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
router.put("/updateBooking",auth.jwtToken,ticketRouter.updateBooking)
/**
* @swagger
* /ticket/cancelTcketByUser:
*   delete:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: User Token is required.
*         in: header
*         required: true
*       - name: _id
*         description: Book Id is required.
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
router.delete("/cancelTcketByUser",auth.jwtToken,ticketRouter.cancelTcketByUser)
/**
* @swagger
* /ticket/cancelTicketByOrganizer:
*   delete:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: organizer Token is required.
*         in: header
*         required: true
*       - name: _id
*         description: Booking Id is required.
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
router.delete("/cancelTicketByOrganizer",auth.subJwtToken,ticketRouter.cancelTicketByOrganizer)

/**
* @swagger
* /ticket/bookingTicketList:
*   get:
*     tags:
*       - TICKET BOOKING MANAGEMENT
*     description: Creating Docs for TICKET BOOKING
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: Admin Token is required.
*         in: header
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get("/bookingTicketList",auth.subJwtToken,ticketRouter.bookingTicketList)


module.exports=router
