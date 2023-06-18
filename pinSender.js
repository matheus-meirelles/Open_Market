
const nodeMailer = require("nodemailer")
//Exports a function that sends an email with the paramether's info

const transporter = nodeMailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'matheustests@outlook.com',
        pass: "soufeliz123"
    }
})

const pinSender = (pin, email) => {
    let config = {
        from: "matheustests@outlook.com",
        to: email,
        subject: "Verification Pin",
        text: `${pin}`
    }
    transporter.sendMail(config, (error, info) => {
        if (error) {
            console.log(error)
        }
        else{
            console.log(`message: ${info.messageId}, sent: ${info.response}`)
        }
    })
}

module.exports = pinSender
