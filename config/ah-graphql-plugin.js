exports.default = {
  graphql: function(api){
    return {
       
      schemas : [{
      	endpoint : '/graph', // for GET/POST routes
      	path : '/graph/schema.js',
      	action : 'graph',
      }]

    };
  }
}; 