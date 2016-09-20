# ah-graphql-plugin

Under active development

## Setup

- install this plugin: `npm install ah-graphql-plugin --save`

- run `./node_modules/.bin/actionhero link --ah-graphql-plugin`

- extend public web server in config/api.js *paths* object

```js
'public':      [ 
  __dirname + '/../public',
  __dirname + '/../node_modules/ah-graphql-plugin/public',
] 
```

## Use
Start the server and you should have a GraphiQL interface ready at http://localhost:8080/graphiql/
The example graph directory will need some work before it's tutorial-ready. I'm actively seeking pull requests here!

## Transpiling
- many graphql examples are written in ES6. I'm using gulp-babel to transpile for my use-case. Here's an example. Make sure to update your ah-graphq-config file to reflect the babel output path!

`npm install --save-dev gulp gulp-babel babel-preset-es2015 changed eslint del fs`

/gulpfile.js
```
var gulp = require("gulp");
var babel = require("gulp-babel");
var changed = require('gulp-changed');
var eslint = require('gulp-eslint');
var del = require('del');
var fs = require('fs'); 

var paths = {
  src: "./graph/**/*.js",
  dest: "graph-dist",
};

paths.toClean = [paths.dest].concat(paths.toRootDirectory);

gulp.task('buildDist', function(){

  gulp.src(paths.src) // pipe all of the files to dist, excluding the toSkipDist list
  		.pipe(changed('./' + paths.dest + '/'))
      .pipe(babel({
          ignore: 'gulpfile.babel.js',
          presets : ['es2015']
      }))
      .pipe(gulp.dest('./' + paths.dest + '/'));
  
  gulp.src(['./graph/**/*.*', '!./graph/**/*.js']) // pipe all non-js files directly
      .pipe(gulp.dest('./' + paths.dest + '/'));
    
});
 
gulp.task('watch', ['lint', 'buildDist'], function(){
    gulp.watch([paths.src ], ['buildDist']);
});

gulp.task('lint', () => {
    return gulp.src(['./' + paths.src]) // pipe all of the files to dist, excluding the toSkipDist list
      	.pipe( eslint() )
      	.pipe(eslint.format())
});


gulp.task('default', ['build'], function() {
 return gulp.start('watch');
});
```
