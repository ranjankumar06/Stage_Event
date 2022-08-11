const router =  require('express').Router();
const organizerRouter = require('../controller/organizerController')
const auth = require('../middleware/auth')



/**
* @swagger
* /organizer/OrganizerSignUp:
*   post:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: firstName
*         description: firstName is required.
*         in: formData
*         required: true
*       - name: lastName
*         description: lastName is required.
*         in: formData
*         required: true
*       - name: mobileNumber
*         description: mobileNumber is required.
*         in: formData
*         required: true
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: password
*         description: password is required.
*         in: formData
*         required: true
*       - name: confirmPassword
*         description: confirmPassword is required.
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
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/

router.post("/OrganizerSignUp",organizerRouter.OrganizerSignUp)
/**
* @swagger
* /organizer/OrganizerOtpVerify:
*   put:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: otp
*         description: otp is required.
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

router.put("/OrganizerOtpVerify",organizerRouter.OrganizerOtpVerify)
/**
* @swagger
* /organizer/OrganizerResendOtp:
*   put:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
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

router.put("/OrganizerResendOtp",organizerRouter.OrganizerResendOtp)
/**
* @swagger
* /organizer/OrganizerLogin:
*   post:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: password
*         description: password is required.
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
router.post("/OrganizerLogin",organizerRouter.OrganizerLogin)
/**
* @swagger
* /organizer/OrganizerForgotPassword:
*   put:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
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
router.put("/OrganizerForgotPassword",organizerRouter.OrganizerForgotPassword)
/**
* @swagger
* /organizer/OrganizerEditProfile:
*   put:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token is required.
*         in: header
*         required: true
*       - name: firstName
*         description: firstName is required.
*         in: formData
*         required: false
*       - name: lastName
*         description: lastName is required.
*         in: formData
*         required: false
*       - name: dateOfBirth
*         description: dateOfBirth is required.
*         in: formData
*         required: false
*       - name: image
*         description: image is required.
*         in: formData
*         type: file
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
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.put("/OrganizerEditProfile",auth.subJwtToken,organizerRouter.OrganizerEditProfile)
/**
* @swagger
* /organizer/OrganizerGetProfile/{_id}:
*   get:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: _id
*         description: _id is required.
*         in: path
*         required: true
*     responses:
*       200:
*         description: Done successfully.
*       404:
*         description: DATA NOT FOUND.
*       500:
*         description: Internal server error.
*/
router.get("/OrganizerGetProfile/:_id",organizerRouter.OrganizerGetProfile)
/**
* @swagger
* /organizer/OrganizerResetPassword:
*   put:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: email is required.
*         in: formData
*         required: true
*       - name: otp
*         description: otp is required.
*         in: formData
*         required: true
*       - name: newPassword
*         description: newPassword is required.
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
router.put("/OrganizerResetPassword",organizerRouter.OrganizerResetPassword)
/**
* @swagger
* /organizer/OrganizerChangePassword:
*   put:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: token
*         description: token is required.
*         in: header
*         required: true
*       - name: password
*         description: password is required.
*         in: formData
*         required: true
*       - name: newPassword
*         description: newPassword is required.
*         in: formData
*         required: true
*       - name: confirmNewPassword
*         description: confirmNewPassword is required.
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
router.put("/OrganizerChangePassword",auth.subJwtToken,organizerRouter.OrganizerChangePassword)

/**
* @swagger
* /organizer/OrganizerViewEvent/{_id}:
*   get:
*     tags:
*       - ORGANIZER MANAGEMENT
*     description: Creating Docs for ORGANIZER
*     produces:
*       - application/json
*     parameters:
*       - name: _id
*         description: _id is required.
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
router.get('/OrganizerViewEvent/:_id',organizerRouter.OrganizerViewEvent)
module.exports =router
