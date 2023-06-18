function sendPin() {
    let pin = document.getElementById("pin").value
    let jsonPin = { pin: pin }
    alert(pin)
    fetch("/check-pin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonPin)
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        else {
            throw new Error("Wrong Pin!")
        }
    })
    .then((data) => {
        console.log(data)
        if (data.success) {
            window.location.href = "http://localhost:3000/home"
        }
        else {
            console.log("success != true")
        }
    })
}