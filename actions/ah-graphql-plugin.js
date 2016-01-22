var graphql = require('graphql').graphql;

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

    graphql(api.graphql.schemas['/graphql'], data.params.query, '', data.params.variables)
    .then(function(res){
      data.response = res
      next();
    }).catch(function(err){
      next(err);
    })
    
  }
};