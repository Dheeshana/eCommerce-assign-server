const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => err.status(400).json('Error : ' + err));
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        email,
        username,
        password,
    });

    newUser.save()
        .then(() => res.json('User Added!!'))
        .catch(err => err.status(400).json('Error : ' +err));
});

module.exports = router;

