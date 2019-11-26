const express = require('express')
const db = require('./data/db')

const port = 5000

const server = express()

server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(port, () => 
    console.log(`server is listening on port ${port}`))

