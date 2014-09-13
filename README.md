# grunt-ng-modules

> An opinionated plugin for organizing Angular source code

> Allows devs to modularize their Angular code and separate it from distribution .js and .css files.

## Module Structure

This plugin deals with Angular modules in a very strict way. Below is the recommended folder structure to be used in conjunction with the plugin

    |-- /angular/modules (call this one whatever you want)
        |-- /module-one
        `-- /module-two
            |-- module.js
            |-- routes.js
            |-- /providers
            |-- /services
            |-- /controllers
            |-- /views
            `-- /directives
                |-- /directive-one
                `-- /directive-two
                    |-- directive-two.js
                    |-- directive-two.css
                    `-- directive-two.html
                    
In order to use this plugin you *must* have:

- A folder for every module (the name of the folder is the name of the distribution files)
- A `module.js` for every module (this must contain your module declaration, ie: `angular.module('my-module', [])` );

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ng-modules --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ng-modules');
```

## The "ng_modules" task

### Overview
In your project's Gruntfile, add a section named `ng_modules` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ng_modules: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.minify
Type: `Boolean`
Default value: `false`

Whether or not to create minified (.min.*) versions of the distribution files.

#### options.viewDir
Type: `String`
Default value: `'html'`

The name of the directory where all view (.html) files are copied to.

#### options.cacheViews
Type: `Boolean`
Default value: `false`

If true - the plugin will create an Angular module (named 'templates.{module-name}') and load all views for that module into the templateCache. This creates a new file, named `{module-name}-templates.min.js`

### Targets

#### target.src
Type: `String`
Default value: `''`

The source directory where all modules are stored.

#### target.dest
Type: `String`
Default value: `''`

The destination directory where all distribution files should be created.

### Usage Examples

```js
grunt.initConfig({
  ng_modules: {
    options: {
      minify: true,
      viewDir: 'partials'
    },
    local: {
      src: 'angular/modules',
      dest: 'static/ng-modules'
    },
    production: {
      options: {
        cacheViews: true
      },
      src: 'angular/modules',
      dest: 'static/ng-modules'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
