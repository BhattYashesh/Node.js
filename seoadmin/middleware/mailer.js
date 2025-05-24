const nodemailer = require("nodemailer")
// we have to install command npm i nodemailer

const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "yasheshbhatt777@gmail.com" ,
        pass : "eqkpswcgaqvvlqeu"
        // this pass was get from gmail -> manage google account -> search app password => give any name -> copy that code and paste in this pass and then we have to remove the space from it
    }
})

module.exports.sendOTP = (to,otp)=>{
    let mailoption  = {
        to : to,
        from : "yasheshbhatt777@gmail.com",
        subject : "PASSWORD RESET OTP",
        text : `your password reset OTP is ${otp}`
    }

    transport.sendMail(mailoption);
}