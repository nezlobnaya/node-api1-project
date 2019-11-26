const express = require('express')
const db = require('./data/db')

const port = 5000

const server = express()


server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
      res.status(200).json({ 
        users })
    })
    .catch(error => {
      res.status(500, 'The users information could not be retrieved', res)
    })
})

server.listen(port, () => 
    console.log(`server is listening on port ${port}`))

