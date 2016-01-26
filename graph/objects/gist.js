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

   var gistType = new GraphQLObjectType({
    name: 'Gist',
    description: 'Github Gist Object',
    fields: () => ({
      
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the gist.',
      },
      description : {
        type: GraphQLString,
        description: '',
      },
      truncated : {
        type: GraphQLString,
        description: '',
      },
      created_at : {
        type: GraphQLString,
        description: '',
      },
      updated_at : {
        type: GraphQLString,
        description: '',
      },

      url : {
        type: GraphQLString,
        description: '',
      },

    })
  });

  return {
    gistType : gistType,
  }
}