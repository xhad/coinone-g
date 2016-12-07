// I like to use Mocha Testing framework.
// sudo npm i -g mocha
// mocha all.spec.js
// test require to have bitcoin and krw balance at coinone
const assert = require('assert');
const index = require('../index');
const config = require('../config');
const CoinOne = new index(config.token, config.secret, config.url);


function delay() {
  return setTimeout(function() {}, 2000)
}

function public(err, data, spec, done) {
  if (err) {
    console.log(err);
    done();
  } else {
    let d = JSON.parse(data);
    assert.equal(d.result, spec);
    done();
  }
}

function private(err, data, spec, done) {
  if (err) return err;
  else {
    assert.equal(data.result, spec);
    done();
  }
}

describe('Public Endpoints', function() {
  it('/orderbook', function(done) {
    CoinOne.orderbook((err, data) => {
      public(err, data, 'success', done)
    })
  })

  it('/trades', function(done) {
    CoinOne.trades((err, data) => {
      public(err, data, 'success', done)
    })
  })

  it('/ticker', function(done) {
    CoinOne.ticker((err, data) => {
      public(err, data, 'success', done)
    })
  })
})

describe('Account Endpoints', function() {
  it('userInfo()', (done) => {
    CoinOne.userInfo(null, (err, data) => {
      private(err, data, 'success', done)
    })
  })
  it('balance()', (done) => {
    CoinOne.balance(null, (err, data) => {
      private(err, data, 'success', done)
    })
  })
})

describe('Order Endpoints', function() {
  it('/limit_buy', (done) => {
    let params = {
      price: 1000,
      qty: 0.0001
    }
    CoinOne.limitBuy(params, (err, data) => {
      private(err, data, 'success', done)
    })
  })
  it('/limit_sell', (done) => {
    let params = {
      price: 1000000,
      qty: 0.0001
    }
    CoinOne.limitSell(params, (err, data) => {
      private(err, data, 'success', done)
    })
  })
  it('/unfilledOrders', (done) => {
      CoinOne.unfilledOrders(null, (err, data) => {
        private(err, data, 'success', done)
      })
    })
    it('/filledOrders', (done) => {
        CoinOne.filledOrders(null, (err, data) => {
          private(err, data, 'success', done)
        })
      })
    it('/cancel', (done, next) => {
      function cancel(order) {
        let isAsk
        if (order.type == 'ask')
          isAsk = 1;
        else isAsk = 0;

        let params = {
          order_id: order.orderId,
          price: order.price,
          qty: order.qty,
          is_ask: isAsk
        }
        CoinOne.cancel(params, (err, data) => {
          if (err) throw err;
          else {
              delay()
              assert.equal(data.result, 'success');
          }
          done();
        })
      }

      CoinOne.unfilledOrders(null, (err, data) => {
        if(err) throw err;
        else {
          data.limitOrders.forEach((order) => {
            cancel(order);
          })
        }
      })
    })
    console.log('\tChad Lynch - clynch33@gmail.com\r')
})
