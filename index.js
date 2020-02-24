const bcrypt = require('bcrypt')
const express = require('express')
const User = require('./data/users-model')

const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.status(200).json({ message: 'API is working!'})
})

server.post('/api/register', (req,res) => {
    const user = req.body
    user.password = bcrypt.hashSync(user.password,12)
    User.register(user)
    .then(id => {
        res.status(201).json({ message: `User with ID ${id} Created!`})
    })
    .catch(err => {
        console.log(err)

        res.status(500).json({ errorMessage: 'Something bad happened'})
    })
})

server.post('/api/login', (req,res) => {
    const userData = req.body

    User.login(userData)
    .then(user => {
        if (bcrypt.compareSync(userData.password, user.password)) {
            res.status(200).json({ message: 'User is valid'})
        } else {
            res.status(400).json({ message: 'username or password wrong'})
        }
    })
    .catch(err => {
        console.log(err)

        res.status(500).json({ errorMessage: 'Something bad happened at Login'})
    })
})

server.get('/api/users', (req,res) => {
    

})

server.listen(5000, () => console.log('Server is on 5000'))