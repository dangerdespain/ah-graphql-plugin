var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
// var babel = require("babel-core");
var _ = require('underscore');

module.exports = {
  loadPriority : 10,
  start : function (api, next) {

    api.graphql = {
      schemas : {},
    }

    Promise.each(api.config.graphql.schemas, function(schemaOpts){
      var schemaOpts = schemaOpts || {};

      var name = schemaOpts.name || 'graph';
      
      schemaOpts = _.defaults(schemaOpts, {
        schemaName : name,
        filePath : '/' + name + '/index.js',
        endpoint : '/' + name,
      });

      api.routes.registerRoute('get', schemaOpts.endpoint, schemaOpts.getAction, 1, true);
      api.routes.registerRoute('post', schemaOpts.endpoint, schemaOpts.mutateAction, 1, true);

      var filename = api.projectRoot + schemaOpts.path;

      // api.watchFileAndAct(filename, function(){
      //   init();
      //   api.log('\r\n\r\n*** rebooting due to graphql schema change (' + filename + ') ***\r\n\r\n', 'info');
      //   api.commands.restart.call(api._self);
      // })

      var schemaPassthrough = { // optional passthroughs for graph libraries built for / compatible with Actionhero
        api : api
      } 

      var schema = require(filename);

      if(_.isFunction(schema)) schema = schema(schemaPassthrough);
      if(schema.schema) schema = schema.schema;

      api.graphql.schemas[schemaOpts.endpoint] = schema;

    }).then(function(){
      next();
    })

  },

};