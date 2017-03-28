var users = require('../modules/user');

module.exports.create = function(req,res){
	users.createUser(function(err,result){
		if (err){
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
    req.body.interested);      
};

module.exports.update = function(req,res){
	users.updateUser(function(err,result){
		if (err){
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

module.exports.show = function(req,res){
    users.getUser(function(err,result){
        if (err){
			res.json({success: false});
		} else {
            res.json({success: true, user: result});  
        }
    },req.params.id)
};