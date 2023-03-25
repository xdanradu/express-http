const express = require('express')
const app = express()
const port = 3000

app.get('/user', (req, res) => {
    res.send('user from DB')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
