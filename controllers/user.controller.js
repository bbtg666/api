var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var user = require('../models/users.model.js')

module.exports.createUser = function (req, res, next) {
    const newUser = new user({
        email: req.body.email,
        name: req.body.name,
        hash_password: bcrypt.hashSync(req.body.password, 10)
    });
    newUser.save((err) => {
        if (err) {
            return res.json({
                result: "failed",
                data: {},
                messege: `Lỗi: ${err}`
            });
        }
        else {
            newUser.hash_password = undefined;
            return res.json({
                result: "ok",
                data: newUser
            })
        }
    })
};

module.exports.sign_in = function (req, res) {
    user.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, 'RESTFULAPIs') });
    });
};

module.exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.json({ message: req.user });
    }
};

module.exports.isLogin = function (req, res, next) {
    return res.json({
        result: "ok",
        data: req.user
    })
};
