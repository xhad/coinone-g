// Chad Lynch - Seoul, South Korea

const _Request = require('./lib/_request');
const _request = new _Request(token, secret);

class CoinOne {
  constructor(token, secret) {
    this.v = '/v2';
  }

  orderbook(callback) {
    _request.get('/orderbook', callback);
  }

  trades(callback) {
    _request.get('/trades', callback);
  }

  ticker(callback) {
    _request.get('/ticker', callback);
  }

  userInfo(params, callback) {
    _request.post(this.v + '/account/' + 'user_info', params, callback);
  }

  balance(params, callback) {
    _request.post(this.v + '/account/' + 'balance', params, callback);
  }

  cancel(params, callback) {
    _request.post(this.v + '/order/' + 'cancel', params, callback);
  }

  limitBuy(params, callback) {
    _request.post(this.v + '/order/' + 'limit_buy', params, callback);
  }

  limitSell(params, callback) {
    _request.post(this.v + '/order/' + 'limit_sell', params, callback);
  }

  unfilledOrders(params, callback) {
    _request.post(this.v + '/order/' + 'limit_orders', params, callback);
  }

  filledOrders(params, callback) {
    _request.post(this.v + '/order/' + 'complete_orders', params, callback);
  }
}

module.exports = CoinOne;
