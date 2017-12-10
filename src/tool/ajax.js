/**
 * Created by yanglei on 2017/11/28.
 */
var request = require('superagent');

exports.post = function(url, data) {
  return new Promise(function (resolve, reject) {
    request
      .post(url)
      .send(data || {})
      .withCredentials()
      .set('Accept', 'application/json')
      .end(function (err, res) {
        resolve(res.body)
      });
  })
};
exports.get = function(url, data) {
  return new Promise(function (resolve, reject) {
    request
      .get(url)
      .withCredentials()
      .end(function (err, res) {
        resolve(res.body)
      });
  })
};
