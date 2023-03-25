const express = require('express')
let cors = require('cors');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
})

const app = express()
app.use(cors());

let bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

const port = 3000;





app.get('/users', (req, response) => {
    pool.query('SELECT * FROM users;', (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.post('/login', (request, response) => {
    console.dir(request.body);
    const query = `SELECT * FROM users WHERE username='${request.body.username}' AND password='${request.body.password}'`;
    console.log(query);
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        if(results.rows.length > 0) {
            response.status(200).json({status:'ALLOWED'})
        } else {
            response.status(401).json({status:'FORBIDDEN'})
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
