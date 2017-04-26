var category_users = require('../modules/category_user');

module.exports.create = function(req,res){
    category_users.createCategoryUser(function(err,result){
            if (err){
                res.json({success: false});
            } else {
                res.json({success: true, category_user: result});
            }
        },
        req.body.user_id,
        req.body.category_id);
};

module.exports.get_category_users = function(req,res){
    category_users.getCategoryUsers(function(err,result){
            if (err){
                console.log(err);
                res.json({success: false});
            } else {
                res.json({success: true, category_users: result});
            }
        },
        req.params.user_id);
};


module.exports.delete = function(req,res){
    console.log('USER ID',req.params.user_id);
    console.log('CTEGORY ID',req.body.category_id);
    category_users.deleteCategoryUser(function(err,result){
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
    category_users.calculateBloomUser(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            console.log('THE FILER OBTAINED');
            console.log(result);
            res.json({success: true});
        }
    },
    req.params.user_id, req.body.category_id)
};