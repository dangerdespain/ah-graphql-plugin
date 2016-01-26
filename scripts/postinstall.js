#!/usr/bin/env node

var fs     = require('fs');
var path   = require('path');
var mkdirp = require('mkdirp');

var projectConfigDir = path.normalize(process.cwd() + '/../../config/');
var localConfigFile   = path.normalize(__dirname + '/../config/ah-graphql-plugin.js');
var projectConfigFile = path.normalize(process.cwd() + '/../../config/ah-graphql-plugin.js');

var projectSchemaDir = path.normalize(process.cwd() + '/../../graph/');
var localSchemaFile   = path.normalize(__dirname + '/../graph/schema.js');
var projectSchemaFile = path.normalize(process.cwd() + '/../../graph/schema.js');

try {
  fs.lstatSync(projectConfigFile);
} catch (ex) {
  //unable to stat file because it doesn't exist
  console.log("copying " + localConfigFile + " to " + projectConfigFile);
  mkdirp.sync(path.normalize(projectConfigDir));
  fs.createReadStream(localConfigFile).pipe(fs.createWriteStream(projectConfigFile));
}


try {
  fs.lstatSync(projectSchemaFile);
} catch (ex) {
  //unable to stat file because it doesn't exist
  console.log("copying " + localSchemaFile + " to " + projectSchemaFile);
  mkdirp.sync(path.normalize(projectSchemaDir));
  fs.createReadStream(localSchemaFile).pipe(fs.createWriteStream(projectSchemaFile));

}