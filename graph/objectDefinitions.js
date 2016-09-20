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
  GraphQLBool,
} from 'graphql/type';

module.exports = function(api){

	let facebookPostType = new GraphQLObjectType({
    name: 'FacebookPost',
    description: 'A Facebook post',
    fields: ()=>({
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The id of the post.',
      },
      content: {
        type: GraphQLString,
        description: 'The content of the post.',
      },
      provider: {
        type: facebookProviderType,
        resolve: resolver(api.models.FacebookPost.FacebookProvider, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
    })
  });

  let facebookProviderType = new GraphQLObjectType({
    name: 'FacebookProvider',
    description: 'A Facebook provider',
    fields: ()=>({
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The id of the provider.',
      },
      user: {
        type: userType,
        resolve: resolver(api.models.FacebookProvider.User, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
    })
  });

  let instagramPostType = new GraphQLObjectType({
    name: 'InstagramPost',
    description: 'A Instagram post',
    fields: ()=>({
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The id of the post.',
      },
      content: {
        type: GraphQLString,
        description: 'The content of the post.',
      },
      provider: {
        type: instagramProviderType,
        resolve: resolver(api.models.InstagramPost.InstagramProvider, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
    })
  });

  let instagramProviderType = new GraphQLObjectType({
    name: 'InstagramProvider',
    description: 'An Instagram provider',
    fields: ()=>({
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The id of the provider.',
      },
      user: {
        type: userType,
        resolve: resolver(api.models.InstagramProvider.User, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
    })
  });

  let userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: ()=>({
      
      id: { type: new GraphQLNonNull(GraphQLInt) },
      uuid: { type: GraphQLString },
      name: { type: GraphQLString },
     
      facebookPosts: {
        type: new GraphQLList(facebookPostType),
        resolve: resolver(api.models.User.FacebookPosts, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
      instagramPosts: {
        type: new GraphQLList(instagramPostType),
        resolve: resolver(api.models.User.InstagramPosts, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
      facebookProvider: {
        type: new GraphQLList(facebookProviderType),
        resolve: resolver(api.models.User.FacebookProvider, {
          separate: true // load seperately, disables auto including - default: false
        })
      },
      instagramProvider: {
        type: new GraphQLList(instagramProviderType),
        resolve: resolver(api.models.User.InstagramProvider, {
          separate: true // load seperately, disables auto including - default: false
        })
      },

    })
  });

  return {
  	facebookProviderType : facebookProviderType,
  	facebookPostType : facebookPostType,
  	instagramProviderType : instagramProviderType,
  	instagramPostType : instagramPostType,
  	userType : userType,
  }
}

