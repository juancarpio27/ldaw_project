var user_seen = require('../modules/user_seen');

module.exports.create = function(req,res){
    user_seen.createUserSeen(function(err,result){
            if (err){
                res.json({success: false});
            } else {
                res.json({success: true, user_seen: result});
            }
        },
        req.body.user_id,
        req.body.user_seen_id,
        req.body.liked);
};