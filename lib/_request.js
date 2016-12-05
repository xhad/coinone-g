// Chad Lynch - Seoul, South Korea

const crypto = require('crypto');
const errorCodes = require('./error-codes');
const request = require('request');

class _Request {
  constructor(access_token, secret_key) {
    this.url = 'https://api.coinone.co.kr';
    this.token = access_token;
    this.secret = secret_key;
  }

  // method to get requests
  get(path, callback) {
    let options = {
      url: this.url + path,
      method: 'get',
    }

      request(options, (error, response, body) => {
          let data = JSON.parse(body);
          callback(error, body);
      })
  }

  // method to post requests
  post(path, params, callback) {

      let payload = {
        nonce: Date.now(),
        access_token: this.token
      }

      let buildRequest = function(options) {
        request.post(options, (error, response, body) => {
          let data = JSON.parse(body);
          if (data.result == 'success') {
            callback(error, data);
          } else if (data && data.errorCode != '0') {
            data.reason = errorCodes[data.errorCode];
            callback(error, data);
          } else {
            callback(error);
          }
        })
      }

      let buildOptions = function(payload, headers) {
        let options = {
          url: this.url + path,
          headers: headers,
          body: payload
        }
        buildRequest(options);
      }.bind(this);

      let buildHeaders = function(payload, signature) {
        let headers = {
          'content-type': 'application/json',
          'accept': 'application/json',
          'X-COINONE-PAYLOAD': payload,
          'X-COINONE-SIGNATURE': signature
        }

        buildOptions(payload, headers);
      }

      let buildSignature = function(payload) {
        let signature = crypto
          .createHmac('sha512', this.secret.toUpperCase())
          .update(payload)
          .digest('hex');
        buildHeaders(payload, signature);
      }.bind(this);

      let payloadBuffer = function(payload) {
        let makePayload = new Buffer(JSON.stringify(payload))
          .toString('base64');

        buildSignature(makePayload);
      }

      let buildPayload = function(payload) {
          if (params) {
            Object.keys(params).map(function(e) {
              payload[e] = params[e];
            })
          }

          payloadBuffer(payload);
        }
        // starts here and goes up ^^
      buildPayload(payload);
  }
}

module.exports = _Request
