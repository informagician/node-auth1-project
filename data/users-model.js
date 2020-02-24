const knex = require('knex')
const db = knex(require('../knexfile').development)

module.exports = {
    register
}

function register(user) {
    return db('users')
    .insert(user, 'id')
}