const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.status(200).json({ message: 'API is working!'})
})


server.listen(5000, () => console.log('Server is on 5000'))