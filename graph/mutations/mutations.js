import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql/type';

module.exports = function(schema, utils){

  var models = (schema||{}).models || {};

  return {

    editGist: {  
      type: models.gistType,
      args: {
        name: {
          name: 'name',
          type: GraphQLString
        },
        description: {
          name: 'name',
          type: GraphQLString
        },
      },
      resolve: function(obj, params, source, fieldASTs){
        // incomplete
        return params
      }
    },
  }
}