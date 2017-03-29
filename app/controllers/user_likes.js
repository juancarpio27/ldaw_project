var user_likes = require('../modules/user_like');

module.exports.create = function(req,res){
    user_likes.createUserLike(function(err,result){
            if (err){
                res.json({success: false});
            } else {
                res.json({success: true, user_like: result});
            }
        },
        req.body.user_id,
        req.body.category_id);
};

module.exports.get_user_likes = function(req,res){
    user_likes.getUserLikes(function(err,result){
            if (err){
                console.log(err);
                res.json({success: false});
            } else {
                res.json({success: true, user_likes: result});
            }
    },
    req.params.user_id);
};

module.exports.delete = function(req,res){
    user_likes.deleteUserLike(function(err,result){
            if (err){
                res.json({success: false});
            } else {
                res.json({success: true});
            }
        },
        req.params.user_id,
        req.body.category_id);
};

module.exports.calculate_bloom = function(req,res){
    user_likes.calculateBloomUser(function(err,result){
            if (err){
                res.json({success: false});
            } else {
                res.json({success: true});
            }
        },
        req.params.user_id, req.body.category_id)
};