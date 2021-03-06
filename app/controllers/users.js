/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    UserList = require('../model/users'),
    user = new UserList(),
    Event = require('events').EventEmitter;


/**
 * return all users
 * @return {data}
 */
router.get('/', function(req, res, next) {
    user.all(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

/**
 * save postData in database
 * @param {first,middle,last,avtar,age,gender}
 * @return {data}
 */
router.post('/save', function(req, res) {
    var userData = {
        name: {
            first: req.body.first,
            middle: req.body.middle || null,
            last: req.body.last,
            full: [req.body.first, req.body.middle, req.body.last].join(" ")
        },
        avtar: req.body.avtar || null,
        age: req.body.age || 0,
        gender: req.body.gender,
        isActive: false
    }
    var resw = user.save(userData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });

});

/**
 * EventEmitter on
 */
user.on('user-saved', function() {
    console.log('User Saved');
})

/**
 * @exports {router}
 */
module.exports = router;