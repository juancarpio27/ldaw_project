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

module.exports.create = function(req,res){

    categories.createCategory(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true, category: result});
        }
    },req.body.name)

};

module.exports.update = function(req,res){

    categories.updateCategory(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true, category: result});
        }
    },req.params.id, req.body.name)

};
module.exports.destroy = function(req,res){

    categories.deleteCategory(function(err,result){
        if (err){
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    },req.params.id)

};