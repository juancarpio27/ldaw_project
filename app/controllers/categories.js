var categories = require('../modules/category');

module.exports.show = function(req,res){
    categories.getCategory(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true, category: result});
        }
    },req.params.id)
};

module.exports.index = function(req,res){
    categories.indexCategories(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true, categories: result});
        }
    })
};