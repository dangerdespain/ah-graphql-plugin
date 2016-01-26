# graphql-schema-loader

This is a boilerplate schema structure and loader utils to provide file-based organization for GraphQL schemas. Included in this module is a basic Github public API example.

Usage is simple

**Install as npm module**

`npm install graphql-schema-loader --save`

`var schema = require('graphql-schema-loader').schema`

**Install as standalone plugin**

`git clone git@github.com:dangerdespain/graphql-schema-loader.git`

`rm graph-schema-loader/.git` // optional

`var schema = require('./graphql-schema-loader').schema`

** Advanced usage **
Check out the utils.extendSchema/compileSchema functions for schema extentsion capability. This module can easily be extended to dynamically generate schemas from a set of inputs, or to pass in a seeded schema object set.
