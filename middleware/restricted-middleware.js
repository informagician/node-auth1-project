const bcrypt = require('bcrypt')
const Users = require('../data/users-model')

module.exports = (req,res,next) => {
    let { username , password } = req.headers;

    if (username && password) {

        Users.findBy({username})
        first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                res.status(200).json({message:`Welcome ${username}`})
                next()
            } else {
                res.status(401).json({message:'Invalid credentials'})
            }
        })
        .catch(({name, message, stack}) => {
            res.status(500).json({name, message, stack});
        });
    } else {
        res.status(400).json({error:'Please provide credentials'})
    }
}