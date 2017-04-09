# ah-graphql-plugin

This plugin mounts a GraphQL API instance and a GraphiQL user interface in an Actionhero Client. 

## Setup

- install this plugin: `npm install ah-graphql-plugin --save`

- This plugin copies a config file to your Actionhero project. The graphql endpoints are mounted to the server as Actionhero Actions at the same name as the configuration object (default action name = 'graph') , as well as GET/POST routes on the web server (default /api/graph). 

## Use

- run `./node_modules/.bin/actionhero link --ah-graphql-plugin`
and you should have a GraphiQL interface ready at http://localhost:8080/graphiql/

### Transpiling Notes
- many graphql examples are written in ES6. I'm using gulp-babel to transpile for my use-case. *Make sure to update your ah-graphq-config file to reflect the location of your graphql export if you do this*. Everyone has their own way of doing this - I prefer using Gulp to watch and recompile my Graph directory. 

### Transpiling How-to
`npm install --save-dev gulp gulp-babel babel-preset-es2015 changed eslint del fs`
** Copy the scripts/gulpfile.js from the plugin root (found in your node_modules or at https://github.com/dangerdespain/ah-graphql-plugin/blob/master/scripts/gulpfile.js) to the root of your project and run the transpiler using `gulp watch`
