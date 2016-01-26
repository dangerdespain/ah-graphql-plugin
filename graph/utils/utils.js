var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

module.exports = function(){

  var typeBuilder = function(type, name, description){ // for quick type prototyping of basic output types
    return {
      type: type,
      name: name || '',
      description: description || '',
    }
  }

  var utils = {
  	typeBuilder : typeBuilder
  };

  var collectObjects = function(schemaObjs){
  	var models = (schemaObjs||{}).models || {};
	  var files = {}
	  var dirname = __dirname + '/../objects/'
	  fs.readdirSync(dirname).forEach(function(file){
	    var nameParts = file.split("/");
	    var name = nameParts[(nameParts.length - 1)].split(".")[0];
	    files[name] = { filename : dirname + file, loaded : false }
	  });

	  var loaded = false;
	  var countdown = 25;
	  var loaded = false;

	  while(!loaded && countdown){
	    countdown--;
	    loaded = true;
	    _.map(files, function(file){
	      if(!file.loaded){
	        loaded = false
	        try{
	          models = _.extend(models, require(file.filename)(schemaObjs,utils))
	          console.log('loaded',file.filename,'object models')
	          file.loaded = true
	        }catch(e){
	          if(!countdown){
	          	console.log('ERROR - could not load graphql object models. Possible circular reference? (',file.filename,')')
	          	throw e
	          }
	          return file
	        }
	      }
	      return file
	    })
	  }
	  schemaObjs.models = models
	  return schemaObjs
  }

  var collectQueries = function(schemaObjs){
  	var models = (schemaObjs||{}).models || {}
  	var queries = {}
	  var dirname = __dirname + '/../queries/'
	  fs.readdirSync(dirname).forEach(function(file){
	    _.extend(queries, require(dirname + file)(schemaObjs,utils))
	  });
	  schemaObjs.queries = queries
	  return schemaObjs
  }
  var collectMutations = function(schemaObjs, utils){
  	var models = (schemaObjs||{}).models || {}
  	var mutations = {}
	  var dirname = __dirname + '/../mutations/'
	  fs.readdirSync(dirname).forEach(function(file){
	    _.extend(mutations, require(dirname + file)(schemaObjs,utils))
	  });
	  schemaObjs.mutations = mutations
	  return schemaObjs
  }

  var extendSchema = function(schema){

  schema = _.extend(schema, collectObjects(schema))
  	
  	var funcMap = {
  		queries : function(schema){ return collectQueries(schema) },
  		mutations : function(schema){ return collectMutations(schema) }
  	}

  	_.reduce(_.keys(funcMap), function(schema, category){
  		schema = _.extend(schema, funcMap[category](schema))
  		return schema
  	}, schema)

		return schema

  }

  var compileSchema = function(schema){

  	schema = _.defaults(schema, {
  		models : {},
  		queries : {},
  		mutations : {}
  	})
		
		schema = extendSchema(schema);

		var queries = (schema||{}).queries || {}
		var mutations = (schema||{}).mutations || {}

  	var query = new GraphQLObjectType({
	    name: 'Query',
	    fields : queries
	  })

	  var mutation = new GraphQLObjectType({
	    name: 'Mutation',
	    fields: mutations
	  })

	  var schema = new GraphQLSchema({
		  query: query,
		  mutation: mutation,
		});

		return schema

  }

  var utils = _.defaults(utils,{
  	collectObjects : collectObjects,
  	collectQueries : collectQueries,
  	collectMutations : collectMutations,
  	extendSchema : extendSchema,
  	compileSchema : compileSchema,
  	schema : compileSchema({}),
  })

  return utils
}