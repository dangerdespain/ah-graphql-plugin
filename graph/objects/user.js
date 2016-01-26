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

  var models = schema.models;

	var gistType = models.gistType;

	var userType = new GraphQLObjectType({
	  name: 'User',
	  description: 'Github User Object',
	  fields: () => ({

	    login: {
        type: GraphQLString,
        description: '',
      },
	    id: {
	      type: new GraphQLNonNull(GraphQLInt),
	      description: 'The id of the user.',
	    },
	    avatar_url : {
        type: GraphQLString,
        description: '',
      },
	    name : {
        type: GraphQLString,
        description: '',
      },
	    company : {
        type: GraphQLString,
        description: '',
      },
	    location : {
        type: GraphQLString,
        description: '',
      },
	    hireable : {
        type: GraphQLBoolean,
        description: '',
      },
	    bio : {
        type: GraphQLString,
        description: '',
      },

	    gists: {
	      type: new GraphQLList(gistType),
	      description: '',
	      resolve: function(user, params, source, fieldASTs){
	        return utils.req('get',
	        	'/users/' + user.login + '/gists' ,
	        	{})
	      },
	    },

	  })

	});

	return {
		userType : userType,
	}
}

