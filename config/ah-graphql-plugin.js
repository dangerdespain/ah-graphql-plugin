exports.default = {
  graphql: function(api){
    return {
       
      schemas : [{
      	name : 'graph',
      	path : '/graph/index.js',
      }]

    };
  }
}; 