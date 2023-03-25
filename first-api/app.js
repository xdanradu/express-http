const express = require('express')
const fs = require('fs');
let cors = require('cors');

const app = express()
app.use(cors());

let bodyParser = require('body-parser');
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

const port = 3000

app.get('/students', (req, res) => {
    const students = JSON.parse(fs.readFileSync('./students.json', 'utf8'));
    res.send(students)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
