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

    user: {
      type: models.userType,
      args: {
        username: {
          name: 'username',
          type: GraphQLString
        },
      },
      resolve: function(root, { username }, source, fieldASTs){
        return utils.req('get' , 
          username ? '/users/' + username : '/user' ,
          {})
      }
    },

    gist: {
      type: models.gistType,
      args: {
        id: {
          name: 'username',
          type: GraphQLString
        }
      },
      resolve: function(root, { id }, source, fieldASTs){
        return utils.req('get', '/gists/' + id // ??
          , {})
      }
    },

    gists: {
      type: new GraphQLList(models.gistType),
      args: {
        type : {
          name : 'type',
          type : GraphQLString
        },
        since: {
          name: 'since',
          type: GraphQLString
        }
      },
      resolve: function(root, { since, type }, source, fieldASTs){
        return utils.req('get' , 
          '/gists' ,
          {
            since : since
          })
      }
    },

	}
}