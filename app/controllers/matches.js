var matches = require('../modules/match');

module.exports.get_matches = function(req,res){
    matches.getMatches(function(err,result){
            if (err){
                res.json({success: false});
            } else {
                res.json({success: true, matches: result});
            }
        },
        req.params.user_id);
};

module.exports.destroy = function(req,res){
    matches.deleteMatch(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    },req.params.user_id,req.body.user_b_id);
};

module.exports.remove = function(req,res){
    matches.removeMatch(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    },req.params.id);
};