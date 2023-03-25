const express = require('express')
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

const port = 3000;

app.get('/users', async (req, response) => {
    response.send(users)
})

app.post('/login', (request, response) => {
    console.dir(request.body);

    if (request.body.username === 'admin' && request.body.password === 'nimda') {
        response.send('OK')
    }
    response.send('NOK')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
