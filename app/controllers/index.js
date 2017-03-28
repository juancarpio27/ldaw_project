module.exports.home = function (req, res) {
    res.render('index',{test_handle: 'Information for handlebars'});
};