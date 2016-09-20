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

function CreateUser(api, defs){ // defs contains the object definitions 
  return {
    type: defs.userType,
    args: {
      
      email: { 
        type : new GraphQLNonNull(GraphQLString) 
      },

      password:  { type : GraphQLString },
      name: { type : GraphQLString },
      
    },
    resolve: (source, args, api, data) => {
      // create and return user 
    }
  }
}

function UpdateUser(api, defs){
  return {
    type: defs.userType,
    args: {
      
      user_id: { 
        type : new GraphQLNonNull(GraphQLInt) 
      },
      
      password:  { type : GraphQLString },
      name: { type : GraphQLString },
      
    },
    resolve: (source, args, api, data) => {
      // update user
    }
  }
}


export { 
  CreateUser,
  UpdateUser,
};