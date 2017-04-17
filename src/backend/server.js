/**
 * Created by ilya shusterman on 31/03/2017.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var request = require('request');
var zlib = require('zlib');
var app = express();
var querystring = require('querystring');
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + './../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
  secret: 'keyboard cat',
  user: '',
  maxAge: 3600000,
  saveUninitialized: true
}));

// APIs
// select all
//   nonce = new Date().getTime();
  // url_request = 'https://s2.bitcoinwisdom.com/period?step=900&symbol=btcebtcusd&mode=simple&nonce='+nonce;
  // url_request = 'https://s2.bitcoinwisdom.com/depth?symbol=btcebtcusd&nonce='+nonce;
app.get('/get_btc_test', function(req, res) {
  nonce = new Date().getTime();
  params = {
    // 'step': 900,
    // 'symbol': 'btcebtcusd',
    // 'mode': 'simple',
    // 'nonce': nonce
    'timespan':'20days',
    'format': 'json'
  }
  res.setHeader('Content-Type', 'application/json');
  query_path = querystring.stringify(params)
  // url_path = 'https://s2.bitcoinwisdom.com/period?'+query_path
  url_path = 'https://blockchain.info/charts/market-price?'+query_path;
  request({
    url: url_path,
    method: 'GET'
  }, function (err, response, body) {
    response_body = JSON.parse(body);
    res.json(response_body['values']);
  });

});

// all other routes are handled by Angular
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname,'./../../../dist/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('BitCoinDynamic is listening on port '+app.get('port'));
});


module.exports = app;
