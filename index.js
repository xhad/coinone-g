// Chad Lynch - Seoul, South Korea

const _Request = require('./lib/_request');

class CoinOne {
  constructor(token, secret) {
    this._request = new _Request(token, secret);
    this.v = '/v2';
  }

  orderbook(callback) {
    this._request.get('/orderbook', callback);
  }

  trades(callback) {
    this._request.get('/trades', callback);
  }

  ticker(callback) {
    this._request.get('/ticker', callback);
  }

  userInfo(params, callback) {
    return this._request
      .post(this.v + '/account/' + 'user_info', params, callback);
  }

  balance(params, callback) {
    this._request
      .post(this.v + '/account/' + 'balance', params, callback);
  }

  cancel(params, callback) {
    this._request
      .post(this.v + '/order/' + 'cancel', params, callback);
  }

  limitBuy(params, callback) {
    this._request
      .post(this.v + '/order/' + 'limit_buy', params, callback);
  }

  limitSell(params, callback) {
    this._request
      .post(this.v + '/order/' + 'limit_sell', params, callback);
  }

  unfilledOrders(params, callback) {
    this._request
      .post(this.v + '/order/' + 'limit_orders', params, callback);
  }

  filledOrders(params, callback) {
    this._request
      .post(this.v + '/order/' + 'complete_orders', params, callback);
  }
}

module.exports = CoinOne;
