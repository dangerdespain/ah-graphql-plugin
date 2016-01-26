var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var babel = require("babel-core");
var _ = require('underscore');

module.exports = {

  initialize: function (api, next) {

    api.graphql = {
      schemas : {},
    }

    Promise.each(api.config.graphql.schemas, function(schemaOpts){
      schemaOpts = schemaOpts || {}
      var name = schemaOpts.name || 'graph'
      var schemaOpts = _.defaults(schemaOpts || {},{
        endpoint : '/' + name, // for GET/POST routes
        action : name,
        schemaName : name
      });
      
      api.routes.registerRoute('get', schemaOpts.endpoint, schemaOpts.getAction, 1, true)
      api.routes.registerRoute('post', schemaOpts.endpoint, schemaOpts.mutateAction, 1, true)

      var filename = api.projectRoot + schemaOpts.path;

      // api.watchFileAndAct(filename, function(){
      //   init();
      //   api.log('\r\n\r\n*** rebooting due to graphql schema change (' + filename + ') ***\r\n\r\n', 'info');
      //   api.commands.restart.call(api._self);
      // })

      function init(){

        var schematext = babel.transformFileSync(filename, {}).code;

        var distFilename = filename + '.es5';

        var schema = { // optional passthroughs for graph libraries built for / compatible with Actionhero
          actionhero_API : { api : api }
        } 

        return fs.writeFileAsync(distFilename, schematext).bind({ filename : distFilename, schema : schema, schemaOpts : schemaOpts })
        .then(function(res){
          var schema = require(this.filename);
          if(schema.schema) schema = schema.schema;
          console.log('filename', schema)
          if(_.isFunction(schema)) schema = schema(this.schema);
          console.log('filename', schema)
          api.graphql.schemas[this.schemaOpts.endpoint] = schema
        })

      }

      return init();
      
    }).then(function(){
      next();
    })

  }
};