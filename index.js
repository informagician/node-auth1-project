const bcrypt = require('bcrypt')
const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.status(200).json({ message: 'API is working!'})
})

server.post('/api/register', (req,res) => {
    const user = req.body
    user.password = bcrypt.hashSync(user.password,12)
    
})

server.post('/api/login', (req,res) => {
    const user = req.body

})

server.get('/api/users', (req,res) => {
    

})

server.listen(5000, () => console.log('Server is on 5000'))