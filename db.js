
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'bot',
    host: 'localhost',
    database: 'login',
    password: 'password',
    port: 5432
})

const checkUser = (req, res, exist) => {

    const {email, password} = req.body
    pool.query("SELECT * FROM login WHERE email = $1 AND password = $2", [email, password], (error, results) => {
        if (error) {
            exist(error, null, null)
        }
        else {
            if (results.rows.length > 0) {
                exist(null, true, results.rows[0].id)
            }
            else {
                exist(null, false, null)
            }
        }
    })
}
const createUser = (req, res) => {
    const {email, password, username} = req.body
    pool.query("INSERT INTO login(email, password, username) VALUES('$1', '$2', '$3')", [email, password, username], (error, results) => {
        if (error) {
            return res.status(500).send("Couldn't create user ", error)
        }
        else {
            return res.status(200).send(`User successfully created, email: ${email}, username: ${username}, result: ${results}`)
        }
    })
}

module.exports = {
    checkUser,
    createUser
}