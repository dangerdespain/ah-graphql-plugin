var Promise = require('bluebird');
var agent = require('superagent');
var _ = require('underscore');

agent.Request.prototype.exec = function () {
  var req = this
  return new Promise (function (resolve, reject) {
    req.end(function (er, res) {
      if (er) return reject(er)
      resolve(res)
    })
  })
}

// to-do - implement paging

module.exports = function(models, utils, opts){

  opts = _.defaults(opts||{}, {
    url : 'https://api.github.com',
    AcceptHeader : 'application/vnd.github.v3+json',
  })

	var req = function(method, path, params){
    params = params || {}
    return agent[method](opts.url + path)
    .set('AcceptHeader',opts.AcceptHeader)
    .send(params)
    .exec()
    .then(function(res) {
      if(res.status == 200 && res.body) return res.body;
      throw 'error - status code ' + res.status
    })
  }

  return {
  	req : req,
  }
}