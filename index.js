const express = require("express")
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars")
const nodemailer = require("nodemailer")
const path = require("path")
const sgMail = require('@sendgrid/mail')

const api = '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'

const app = express()

// Initialize the handlebar.
// Must step to be written
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

// Tell where your css files are located
app.use("/public", express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("contact")
})

app.post("/send", (req, res) => {
    console.log(req.body)
    const output = `
    <p>You have a new request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h4>Message:${req.body.msg}</h4>`


    sgMail.setApiKey(api)
    const msg = {
        to: 'bittupaul1998@gmail.com',
        from: 'pbiplab19@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: output,
    }
    sgMail.send(msg)

    return res.render("contact")

    // if(error){
    //     console.log(error)
    // }

    // res.render('contact', {msg:'Email has been sent'})


})



app.listen(5000, () => {
    console.log("Server started")
})



// bittupaul1998@gmail.com    pbiplab19@gmail.com