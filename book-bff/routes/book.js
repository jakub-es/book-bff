var express = require('express');
var router = express.Router();
var request = require('request');
var goodGuyLib = require('good-guy-http');

router.get('/:isbn', function (req, res, next) {
    var goodGuy = goodGuyLib({
        cache: goodGuyLib.inMemoryCache(10),
        maxRetries: 3,
    });
    
    var responseBody;
    goodGuy('https://book-catalog-proxy-4.herokuapp.com/book?isbn=' + req.param('isbn')).then(function (response) {

        responseBody = JSON.parse(response.body);
        var bookInfo = responseBody.items[0].volumeInfo;
        res.render('index', {
            title: bookInfo.title,
            cover: bookInfo.imageLinks.thumbnail
        });
    }).catch(next);
});

module.exports = router;
