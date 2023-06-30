
let button = document.getElementById("send")

console.log(1)

function sendInfo() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email, password)
    let data = {
        email: email,
        password: password
    }
    fetch("http://localhost:3000/checkUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        else {
            console.log("User not found")
        }
    })
    .then((data) => {
        alert(`Succesfully logged, id: ${data.id}`)
        window.location.href = `http://localhost:3000/2fa`
    })
}