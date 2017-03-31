var users = require('../modules/user');
var user_likes = require('../modules/user_like');
var category_users = require('../modules/category_user');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gymrein.itesm@gmail.com',
        pass: 'mayo2017'
    }
});


module.exports.create = function (req, res) {
    users.createUser(function (err, result) {
            if (err) {
                res.json({success: false});
            } else {
                console.log(result);

                var mailOptions = {
                    from: 'gymrein.itesm@gmail.com', // sender address
                    to: result.email, // list of receivers
                    subject: 'Bienvenido a citas', // Subject line
                    text: 'Hello world ?', // plain text body
                    html: '<b>Bienvenido al nuevo sistema de citas '+result.name+'!</b>' // html body
                };


                transporter.sendMail(mailOptions, function (error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
                res.json({success: true, user: result});
            }
        },
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.birth,
        req.body.sex,
        req.body.interested);
};

module.exports.update = function (req, res) {
    users.updateUser(function (err, result) {
            if (err) {
                res.json({success: false});
            } else {
                res.json({success: true, user: result});
            }
        },
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.birth,
        req.body.sex,
        req.body.interested,
        req.params.id);
};

module.exports.show = function (req, res) {
    users.getUser(function (err, result) {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true, user: result});
        }
    }, req.params.id)
};

module.exports.destroy = function (req, res) {
    users.destroyUser(function (err, result) {
        if (err) {
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    }, req.params.id)
};




module.exports.interested = function (req, res) {

    var interested = [];

    user_likes.calculateBloomUser(function (err, bloom) {
        if (err) {
            res.json({success: false});
        }
        users.getUsersInterested(function (err, result) {
            if (err) {
                res.json({success: false});
            } else {
                var interested = [];
                result.forEach(function(user,index){

                    category_users.getCategoryUsers(function(err,categories){
                        var insert = true;
                        for (var j =0; j < categories.length; ++j){
                            insert = insert && bloom.test(categories[j].name);
                        }
                        if (insert){
                            console.log('ADDED TO INTERESTED');
                            interested.push(user);
                        }
                        if (index == result.length - 1){
                            console.log('SENDING RESPONSE');
                            res.json({success: true, users: interested});
                        }

                    },user.id);
                });

            }
        }, req.params.id, bloom);
    }, req.params.id);


};