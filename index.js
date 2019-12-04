const express = require('express')
const db = require('./data/db')

const port = 5000

const server = express();
server.use(express.json())

//Create
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ error: 'Please provide name and bio for the user.' })
  }
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database" })
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
  if (!req.body.id) {
    return res.status(404).json({ error: 'The user with the specified ID does not exist.' })
  }
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
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({ error: 'Please provide name and bio for the user.' })
  }
  
  db.update(id, userChange)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message:` "The user with the specified ID ${id} does not exist.`})
      }
    })
    .catch(err => {
      res.status(500, 'The users information could not be modified', res)
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
        res.status(404).json({message: `The user with the specified ID:${id} does not exist`})
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" })
    })
})

server.listen(port, () => 
    console.log(`server is listening on port ${port}`))

