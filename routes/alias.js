var express = require('express');
var router = express.Router();
var aliasdb = require('../aliasdb');

router.get('/:alias', function (req, res) {
    var alias = req.params['alias'];
    aliasdb.getImage(alias, function(err, url) {
        if(err) {
            console.log(err);
            res.status(500).send('Something is broken! :(');
        } else {
            if(url === null) {
                res.render('waiting', {alias: alias});
            } else {
                res.redirect(url);
            }
        }
    });
});

router.post('/:alias', function(req, res) {
    var alias = req.params['alias'];
    aliasdb.saveImage(alias, req.body.url);
    res.send('ok');
});

router.get('/', function(req, res) {
    res.send('Create an alias!');
});

module.exports = router;