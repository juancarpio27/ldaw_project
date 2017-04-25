var users = require('../modules/user');
var admins = require('../modules/admin');

module.exports.create = function (req, res) {
    console.log('CREATING SESSION!!!');
    users.getUserByEmail(function (err, result) {
            if (err) {
                res.json({success: false});
            } else {
                if (result)
                    if (result.password == req.body.password){
                        req.session.name = result.name;
                        req.session.email = result.email;
                        res.json({success: true, user: result});
                    }
                    else
                        res.json({success: false, error: 'Password incorrect'});
                else
                    res.json({success: false, error: 'User does not exists'});
            }
        },
        req.body.email);
};

module.exports.destroy = function(req,res){
    req.session.name = null;
    req.session.email = null;
    res.json({success: true});
};

module.exports.create_admin = function (req, res) {
    console.log('HERE I AM');
    admins.getAdminByUsername(function (err, result) {
            if (err) {
                console.log('QUERY ERROR',err);
                res.json({success: false});
            } else {
                console.log('QUERY FINISHED',result);
                if (result)
                    if (result.password == req.body.password){
                        req.session.admin = result.username;
                        res.json({success: true, admin: result});
                    }
                    else
                        res.json({success: false, error: 'Password incorrect'});
                else
                    res.json({success: false, error: 'User does not exists'});
            }
        },
        req.body.username);
};

module.exports.destroy_admin = function(req,res){
    req.session.admin = null;
    res.json({success: true});
};