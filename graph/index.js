var _ = require('underscore');
var utils = require('./utils/utils')();
var githubUtils = require('./utils/githubUtils')();
_.extend(utils, githubUtils);

var schema = utils.compileSchema({}, utils)

module.exports.schema = schema
module.exports.utils = utils
