const knex = require('knex')
const db = knex(require('../knexfile').development)

module.exports = {
    register,
    login
}

function register(user) {
    return db('users')
    .insert(user, 'id')
}

function login(user){
    return db('users')
    .select('*')
    .where({username: user.username})
    .first()
}