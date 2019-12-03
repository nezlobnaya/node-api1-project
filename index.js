const express = require('express')
const db = require('./data/db')

const port = 5000

const server = express();
server.use(express.json())

//Create
server.post('/api/users', (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500, 'The user information cannot be added', res)
    })
 
})

// Read
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

//Read a user
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.status(200).json({
        user
      })
    })
    .catch(error => {
      res.status(500, 'The user information could not be retrieved', res)
    })
})
//Update
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const userChange = req.body;

  db.update(id, userChange)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message:`id${id} does not exist`})
      }
    })
    .catch(err => {
      res.status(500, 'The users information could not be updated', res)
    })
})

//Delete
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deleteUser => {
      if(deleteUser) {
        res.status(204).end()
      } else {
        res.status(404).json({message: `i could not find id=${id}`})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.listen(port, () => 
    console.log(`server is listening on port ${port}`))

