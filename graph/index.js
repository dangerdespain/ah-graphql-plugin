import { resolver } from 'graphql-sequelize/lib';
import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} from 'graphql/type';

import GraphObjectDefinitions from './objectDefinitions';

import { CreateUser, UpdateUser } from './mutations/userMutations';

var Sequelize = require('sequelize');
var _ = require('lodash');

function defaultArgs(args){
  // An arg with the key limit will automatically be converted to a limit on the target
  _.extend(args, {
    limit: {
      type: GraphQLInt
    },
    // An arg with the key order will automatically be converted to a order on the target
    order: {
      type: GraphQLString
    }
  });

  return args;
}


module.exports = function (opts) {

  const api = opts.api;

  var d = GraphObjectDefinitions(api)

  var Query = new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        
        me: {
          // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
          type: d.userType,
          args: defaultArgs(),
          resolve: function({session}, args, api, fieldASTS) {
            // return api.models.User.findById(session.user_id)
          }
        },
       
        users: {
          // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
          type: new GraphQLList(d.userType),
          args: defaultArgs({}),
          resolve: resolver(
            api.models.User, {})
        },
        test: {
          type: GraphQLString,
          args: defaultArgs({}),
          description : 'this endpoint just says hello!'
          resolve: function(source, args, api, { rootValue }) {
            return 'hello';
          }
        },
      }
  });

  var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      
      createUser : CreateUser(api,d),
      updateUser : UpdateUser(api,d),

    }
  })


  var schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
  });

  return schema;
};