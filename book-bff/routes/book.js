const express = require('express');
const router = express.Router();
const request = require('request');
const goodGuyLib = require('good-guy-http');
const jp = require('jsonpath');

router.get('/:isbn', function (req, res, next) {
    const goodGuy = goodGuyLib({
        maxRetries: 3,
    });

    goodGuy('https://book-catalog-proxy-4.herokuapp.com/book?isbn=' + req.param('isbn')).then(function (response) {

        let responseBody = JSON.parse(response.body);
        let title = jp.value(responseBody, '$..title');
        let cover = jp.value(responseBody, '$..thumbnail');
        res.render('index', {
            title: title,
            cover: cover
        });
    }).catch(next);
});

module.exports = router;
