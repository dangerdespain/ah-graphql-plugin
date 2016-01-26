var graphql = require('graphql').graphql;
var parse = require('json-safe-parse');

exports.graph = {
  name: 'graph',
  description: 'Graph Endpoint',
  middleware: [],
  version : 1,

  inputs: {
    variables : {},
    query : {},
  },

  run: function (api, data, next) {

    new Promise(function(resolve, reject){
      var query = data.params.query
      var variables = parse(data.params.variables)

      graphql(api.graphql.schemas['/graph'], query, data, variables)
      .then(function(res){
        data.response = res
        next();
      })

    }).catch(function(err){
      next(err);
    })
    
  }
};