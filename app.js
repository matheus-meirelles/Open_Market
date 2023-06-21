
const express = require("express")
const app = new express()
const query = require("./db")
const send = require("./pinSender")
const path = require('path')
const port = 3000
const usrpin = []

app.use(express.json())
app.use(express.static('public'))

app.get("/login", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'login.html')
     res.sendFile(filePath)
})

app.post("/login", (req, res) => {
    query.checkUser(req, res, (error, results, id) => {
        if (error) {
            console.error(error)
            return res.status(500).send("500 internal server error")
        }
        if (results) {
            res.status(200).json({id: id})
            const { email } = req.body
            data = { email: email}

            fetch("http://localhost:3000/create-pin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    console.log(`email succesfully sent: ${email}`)
                }
                else {
                    console.log("Data sending failed")
                }
            })
            .catch(error => {
                console.log("Error", error)
                res.status(500)
            })
            
        }
        else {
            return res.status(404).send("404 user not found")
        }
        
    })
})
app.get("/2fa", (req, res) =>  {
    const filePath = path.join( __dirname, 'public', '2fa.html')
    res.sendFile(filePath)
})
app.post("/create-pin", (req, res) => {
    const email = req.body.email
    console.log(`Sent email: ${req.body.email}`)
    if (email != undefined) {
        console.log("email != undefined")
        const pin = Math.floor(100000 + Math.random() * 900000)
        usrpin.push(pin)
        console.log(usrpin)
        console.log(pin, email)
        send(pin, email)
        res.status(200).send({
            pin: pin,
            email: email
    })
}
    else {
        console.log(email)
    }
})
    
app.post("/check-pin", (req, res) => {
    const sentPin = req.body.pin

    if (sentPin == usrpin[0]) {
        console.log("SUCCESS!")
        res.status(200).send({success: true})
    }
    else {
        res.status(401).send({error: "Invalid Pin"})
    }
})

app.get("/sign-up", (req, res) => {
    const filePath = path.join( __dirname, 'public', 'sign-up.html')
    res.sendFile(filePath)
})


app.listen(port, () => {console.log(`App is running in port: ${port}`)})
