var graphql = require('graphql').graphql;
var parse = require('json-safe-parse');

exports.graph = {
  name: 'graph',
  description: 'Graph Endpoint',
  scopes : ['public'],
  middleware: [],

  inputs: {
    variables : {
      default : function(){ return '{}' }
    },
    query : {},
  },

  run: function (api, data, next) {

    new Promise(function(resolve, reject){

      var query = data.params.query
      var variables = data.params.variables;

      try {
        variables = JSON.parse(variables)
      }catch(e){

      }

      graphql(api.graphql.schemas['/graph'], query, data, api, variables)
      .then(function(res){
        data.response = res
        next();
      }).catch(function(err){
        next(err);
      })
      
    })
    .catch(function(err){
      api.log('error',err)
      next(err);
    })
    
  }
};