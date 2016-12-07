// Chad Lynch - Seoul, South Korea

const _Request = require('./lib/_request');

const CoinOne = function(token, secret) {
  this._request = new _Request(token, secret);
  this.v = '/v2';
}

CoinOne.prototype.orderbook = function(callback) {
  this._request.get('/orderbook', callback);
}

CoinOne.prototype.trades = function(callback) {
  this._request.get('/trades', callback);
}

CoinOne.prototype.ticker = function(callback) {
  this._request.get('/ticker', callback);
}

CoinOne.prototype.userInfo = function(params, callback) {
  this._request.post(this.v + '/account/' + 'user_info', params, callback);
}

CoinOne.prototype.balance = function(params, callback) {
  this._request.post(this.v + '/account/' + 'balance', params, callback);
}

CoinOne.prototype.cancel = function(params, callback) {
  this._request.post(this.v + '/order/' + 'cancel', params, callback);
}

CoinOne.prototype.limitBuy = function(params, callback) {
  this._request.post(this.v + '/order/' + 'limit_buy', params, callback);
}

CoinOne.prototype.limitSell = function(params, callback) {
  this._request.post(this.v + '/order/' + 'limit_sell', params, callback);
}

CoinOne.prototype.unfilledOrders = function(params, callback) {
  this._request.post(this.v + '/order/' + 'limit_orders', params, callback);
}

CoinOne.prototype.filledOrders = function(params, callback) {
  this._request.post(this.v + '/order/' + 'complete_orders', params, callback);
}



module.exports = CoinOne;
