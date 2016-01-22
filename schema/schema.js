import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import Promise from 'bluebird';

// import co from 'co';
// import User from './user';

// var type = require('graphql/type')

module.exports = function(api){
  /**
   * generate projection object for mongoose
   * @param  {Object} fieldASTs
   * @return {Project}
   */
  // function getProjection (fieldASTs) {
  //   return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
  //     projections[selection.name.value] = 1;

  //     return projections;
  //   }, {});
  // }

  var userType = new GraphQLObjectType({
    name: 'User',
    description: 'User creator',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the user.',
      },
      name: {
        type: GraphQLString,
        description: 'The name of the user.',
      },
      friends: {
        type: new GraphQLList(userType),
        description: 'The friends of the user, or an empty list if they have none.',
        resolve: function(user, params, source, fieldASTs){
          return [user]
        },
      }
    })
  });

  var query = new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: function() {
          return new Promise(function(resolve, reject){
            //api.stats.getAll(function(err, stats){
              api.tasks.details(function(err, details){
                var res = {
                  id                : api.id,
                  actionheroVersion : api.actionheroVersion,
                  uptime            : new Date().getTime() - api.bootTime,
                  // stats             : stats,
                  queues            : details.queues,
                  workers           : details.workers
                }
                resolve({ res : res })
              });
            //});
          })
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, { id }, source, fieldASTs){
          return { id : 1, name : 'devin' }
        }
      }
    }
  })

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: userType,
        args: {
          name: {
            name: 'name',
            type: GraphQLString
          }
        },
        resolve: function(obj, { name }, source, fieldASTs){
          return co(function *() {

            var user = {
              name : name
            }

            return user
          })
        }

      },
      deleteUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(obj, id, source, fieldASTs){
          return co(function *() {
            return {}
          })
        }
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            name: 'name',
            type: GraphQLString
          }
        },
        resolve: function(obj, params, source, fieldASTs){
          return co(function *() {

            return { id : 1, name : 'danger' };

          })
        },
      }
    }
  })

  var schema = new GraphQLSchema({
    query: query,
    mutation: mutation
  });

  return schema;

//export var getProjection;
}
