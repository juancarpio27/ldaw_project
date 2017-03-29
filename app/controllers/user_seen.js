var user_seen = require('../modules/user_seen');
var match = require('../modules/match');

module.exports.create = function(req,res){
    user_seen.createUserSeen(function(err,result){
            if (err){
                res.json({success: false});
            }
            //else {
            //     res.json({success: true, user_seen: result});
            // }
        },
        req.body.user_id,
        req.body.user_seen_id,
        req.body.liked);

    user_seen.searchForLike(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            if (result){
                if (result.liked == 1 && req.body.liked == 1){
                    match.createMatch(function(err,result){
                        if (err){
                            res.json({success: false});
                        }
                    },req.body.user_id,req.body.user_seen_id);
                    res.json({success:true, result: result, match: true});
                }
                else
                    res.json({success:true, result: result, match: false});
            }
            else
                res.json({seccess: true, result: result});
        }
    },req.body.user_id,req.body.user_seen_id);
};