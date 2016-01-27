var express = require('express');
var router = express.Router();
var aliasdb = require('../aliasdb');

router.get('/', function (req, res, next) {
    aliasdb.size(function (err, aliasCount) {
        if (err) {
            res.render('index', {title: 'Aliasr', hasCount: false});
        } else {
            res.render('index', {title: 'Aliasr', aliasCount: aliasCount, hasCount: true});
        }
    });
});

module.exports = router;
