const nodeMailer = require('nodemailer');


module.exports = {
    otp: ()=>{
            let randomNumber =Math.random();
            let sixDigit= Math.floor(randomNumber*100000)+100000;
            return sixDigit;
    },
    generateSlots:async(req,res)=>{
        try {
            let ra=[]
            let d2 = new Date()
            for(j=08;j<18;j++){
                if(j<=12){
                    d2.setMinutes(00)+d2.setHours(j)+d2.setSeconds(00)
                    for(let i=0;i<4;i++){
                        let f =15*i
                        d2.setMinutes(f)
                        let r= d2.toLocaleTimeString()
                        ra.push(r);
                    }
                }else if(j>=14){
                    d2.setMinutes(00)+d2.setHours(j)+d2.setSeconds(00)
                    for(let i=0;i<4;i++){
                        let f =15*i
                        d2.setMinutes(f)
                        let r= d2.toLocaleTimeString()
                        ra.push(r);
                    }
                }else{
                    // d2.setMinutes(00)+d2.setHours(13)+d2.setSeconds(00)
                    // let sbTime= d2.toLocaleTimeString()
                    // d2.setMinutes(00)+d2.setHours(14)+d2.setSeconds(00)
                    // let ebTime= d2.toLocaleTimeString()
                    // let r= `Lunch/Break : ${sbTime} To ${ebTime}`
                    // ra.push(r);
                }
            }
            return  ra;
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong !", responseResult: error.message });
        }
    },

    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: testAccount.user, // generated ethereal user
    //       pass: testAccount.pass, // generated ethereal password
    //     },
    //   });
    
    //   // send mail with defined transport object
    //   let info = await transporter.sendMail({
    //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     to: "bar@example.com, baz@example.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    //   });
    
    //   console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account



    
    sendMail: async (email, subject, text) => {
        try {
            let transporter = nodeMailer.createTransport({
                service: "gmail",
                port: 587,
                secure: false,
                auth: {
                    user: "raviprarai@gmail.com",
                    pass: "agvppvgwmflpbioz",
                },
            });
            let options = {
                from: "raviprarai@gmail.com",
                to:email ,
                subject: subject, // Subject line
                text: text
              
            }
            return await transporter.sendMail(options)
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong !", responseResult: error.message })
        }
    },
    uploadImage: async (image) => {
        try {
            let upload = await cloudinary.uploader.upload(image);
            return upload.secure_url;
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong !", responseResult: error.message });
        }
    },
    generatedSNo(count){
        var str =""+count
        var pad ="00001" 
        var ans= pad.substring(0,pad.length-str.length)+str
        return ans;
    } 
}
