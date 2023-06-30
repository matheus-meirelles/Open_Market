let email = document.getElementById("email")
let password = document.getElementById("password")
let username = document.getElementById("username")

function validInfo() {
    //Input values
    let vemail = document.getElementById("email").value
    let vpassword = document.getElementById("password").value
    let vusername = document.getElementById("username").value
    //Regex for checking if data is in the right format before accepting
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!])[a-zA-Z\d#@$!]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,32}$/
    //Cleaning Inputs
    email.value = null
    password.value = null
    username.value = null
    //Boolens to check the validation
    const isValidEmail = emailRegex.test(vemail)
    const isValidPassword = passwordRegex.test(vpassword)
    const isValidUsername = usernameRegex.test(vusername)
    console.log(isValidEmail, isValidPassword, isValidUsername)

    if (isValidEmail && isValidPassword && isValidUsername) {
        checkEmail(vemail)
    }
}
//Checks if the email really exixts before sending to 2fa
function checkEmail(email) {
    let valid = false
    fetch("/emailValidator", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })
    .then((res) => {
        if (res.ok) {
            console.log(res)
            valid = true
            res.json()
            
        }
        else {
            console.log("Invalid Info", res)
        }
    })
    .then((data) => {
        if (valid) {
            alert("Valid email", data)
            alreadyExists(email)
        }
        
    })
}
async function alreadyExists(email) {
    await fetch("/checkUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })
    .then((res) => {
        if (res.ok) return console.log(`user already exists ${res}`)
        else console.log(res); window.location.href = "http://localhost:3000/2fa"
    })
}