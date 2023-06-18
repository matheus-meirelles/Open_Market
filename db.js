
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
    pool.query('SELECT * FROM login WHERE email = $1 AND password = $2', [email, password], (error, results) => {
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

module.exports = {
    checkUser
}