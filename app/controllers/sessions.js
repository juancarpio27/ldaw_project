var users = require('../modules/user');

module.exports.create = function (req, res) {
    users.getUserByEmail(function (err, result) {
            if (err) {
                res.json({success: false});
            } else {
                console.log('resultado en controller!!');
                console.log(result);
                if (result)
                    if (result.password == req.body.password)
                        //TODO create session in database
                        res.json({success: true, user: result});
                    else
                        res.json({success: false, error: 'Password incorrect'});
                else
                    res.json({success: false, error: 'User does not exists'});
            }
        },
        req.body.email);
};

//TODO destroy session in database