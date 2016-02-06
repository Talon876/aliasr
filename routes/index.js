var express = require('express');
var router = express.Router();
var aliasdb = require('../aliasdb');

router.get('/', function (req, res) {
    aliasdb.size(function (err, aliasCount) {
        if (err) {
            res.render('index', {title: 'Aliasr', hasCount: false});
        } else {
            res.render('index', {title: 'Aliasr', aliasCount: aliasCount, hasCount: true});
        }
    });
});

router.get('/about', function(req, res) {
    res.redirect('/');
});

router.get('/stats', function(req, res) {
    aliasdb.size(function (err, aliasCount) {
        if (err) {
            res.render('stats', {hasCount: false});
        } else {
            res.render('stats', {aliasCount: aliasCount, hasCount: true});
        }
    });
});

module.exports = router;
