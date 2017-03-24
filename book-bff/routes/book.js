var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/:isbn', function (req, res, next) {
    var responseBody;
    request('https://book-catalog-proxy-4.herokuapp.com/book?isbn=' + req.param('isbn'), function (error, response, body) {
        responseBody = JSON.parse(response.body);
        var bookInfo = responseBody.items[0].volumeInfo;
        res.render('index', {
            title: bookInfo.title,
            cover: bookInfo.imageLinks.thumbnail
        });
    });
});

module.exports = router;


