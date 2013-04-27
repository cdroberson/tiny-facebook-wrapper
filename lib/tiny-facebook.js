/**
 * Tiny Facebook Wrapper.
 * @version 0.0.1
 * @author David Cunha
 */

 var request = require('request')
 , util = require('util')
 , qs = require('querystring');

 var apiUrl = 'https://graph.facebook.com/';
 var options = {};

  /**
   *
   * Facebook constructor
   *
   * @param {string} url
   * @param {string} method
   * @param {object or function} data
   * @param {function or undefined} callback
   */
   function FB(url, method, data, callback) {
    this.options = options || {};
    this.options.url = apiUrl + url;
    this.options.method = method;
    if (typeof data === 'function') {
      callback = data;
      data   = null;
    }
    if(data) this.options.body = qs.stringify(data);

    return this.callApi(this.options, callback);
  }

  /**
   * Call the Facebook API with the options object
   * and returns the json response to the callback
   *
   * @param {object} options
   * @param {function} callback
   */
   FB.prototype.callApi = function(options, callback) {
    console.log('facebook request('+options.method+'): ' + options.url);
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(false, body);
      } else {
        callback(new Error(body), null);
      }
    });
  }

  /**
   * Get wrapper
   *
   * @param {string} url
   * @param {string} accessToken
   * @param {object or function} params
   * @param {function} callback
   */
   exports.get = function(url, accessToken, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params   = null;
    }
    if(params) url += '?fields=' + params.fields;
    if (accessToken) url += '?access_token=' + accessToken;

    return new FB(url, 'GET', callback);
  };

  /**
   * Post wrapper
   *
   * @param {string} url
   * @param {string} accessToken
   * @param {object} data
   * @param {function} callback
   */
   exports.post = function(url, accessToken, data, callback) {
    if (accessToken) url += '?access_token=' + accessToken;

    return new FB(url, 'POST', data, callback);
  };