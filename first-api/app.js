const express = require('express')
let cors = require('cors');
let { pool } = require('./db.js');

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
    const query = 'SELECT * FROM users';
    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            throw error
        }
        response.status(200).json(results.rows)
    })
})

app.put('/users', (request, response) => {
    console.dir(request.body);
    const query = `INSERT INTO users (username, password) VALUES ('${request.body.username}', '${request.body.password}')`;
    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            response.status(406).json({status: 'ERROR'})
        } else {
            response.status(201).json({status: 'SAVED'})
        }
    })
})

app.delete('/users/:id', (request, response) => {
    const query = `DELETE FROM users WHERE id=${request.params.id}`;
    console.log(query);
    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            response.status(406).json({status: 'ERROR'})
        } else {
            response.status(200).json({status: 'DELETED'})
        }
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
