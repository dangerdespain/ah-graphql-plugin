var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var babel = require("babel-core");

module.exports = {

  initialize: function (api, next) {

    api.graphql = {
      schemas : {},
    }

    Promise.each(api.config.graphql.schemas, function(schema){
      
      var schema = schema;
      
      api.routes.registerRoute('get', schema.endpoint, schema.getAction, 1, true)
      api.routes.registerRoute('post', schema.endpoint, schema.mutateAction, 1, true)

      var filename = api.projectRoot + schema.path;
      
      // api.watchFileAndAct(filename, function(){
      //   init();
      //   api.log('\r\n\r\n*** rebooting due to graphql schema change (' + filename + ') ***\r\n\r\n', 'info');
      //   api.commands.restart.call(api._self);
      // })

      function init(){

        var schematext = babel.transformFileSync(filename, {}).code;

        var distFilename = filename + '.es'      

        return fs.writeFileAsync(distFilename, schematext).bind({ filename : distFilename, schema : schema })
        .then(function(res){
          api.graphql.schemas[this.schema.endpoint] = require(this.filename)(api);
        })

      }

      return init();
      
    }).then(function(){
      next();
    })

  }
};