const bcrypt = require('bcrypt')
const express = require('express')
const User = require('./data/users-model')
// 2nd day
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session)
const knex = require("./data/dbConfig.js");

const server = express()

// 2nd day
const sessionConfig = {
    name: 'auth1',
    secret: 'keep it secccccure',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    store: new KnexStore({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15,
    }),
}

server.use(express.json())

// 2nd day
server.use(session(sessionConfig))


server.get('/', (req,res) => {
    res.status(200).json({ message: 'API is working!'})
})

server.post('/api/register', (req,res) => {
    const user = req.body
    user.password = bcrypt.hashSync(user.password,12)
    User.register(user)
    .then(id => {
        req.session.loggedIn = true;
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
    Users.users()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)

        res.status(500).json({errorMessage:'couldn\'t retrieve users'})
    })

})

server.listen(5000, () => console.log('Server is on 5000'))