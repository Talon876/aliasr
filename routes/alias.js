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
    if(req.body.url) {
        aliasdb.saveImage(alias, req.body.url);
        res.setHeader('Location', req.originalUrl);
        res.status(201).send(null);
    } else {
        res.status(400).send('Url cannot be empty string.');
    }
});

router.get('/', function(req, res) {
    res.redirect('/');
});

module.exports = router;