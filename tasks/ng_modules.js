/*
 * grunt-ng-modules
 * https://github.com/matt/grunt-ng-modules
 *
 * Copyright (c) 2014 Matt Balmer
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = function (grunt) {
    var options;

    // =====================
    // === Path Creation ===
    // =====================
    function customize(extension, sources) {
        var result = {};

        for(var i = 0, len = options.modules.length; i < len; i++) {
            // Loop through the modules array, and add a Key-Value pair
            // to the results, where the Key is the fully built destination path,
            // and the source is the fully built array of source paths
            var module = options.modules[i],
                _dest = path.join(options.dest, module + extension);

            result[_dest] = sources.map(function(_src) {
                return path.join(options.src, module, _src)
            });
        }

        return result;
    }

    function config(task, extension, sources) {
        var configName = task.replace(/:/gi, '.') + '.files';

        grunt.config(configName,
            customize(extension, sources)
        );

        grunt.task.run(task);
    }

    // =====================
    // === Task Building ===
    // =====================
    function concatJs() {
        config('concat:ng_modules_js', '.js', [
            '**/module.js',
            '**/*.js'
        ]);
    }

    function minifyJs() {
        config('uglify:ng_modules_js', '.min.js', [
            '**/module.js',
            '**/*.js'
        ]);

        config('uglify:ng_modules_js', '.min.js', [
            '**/module.js',
            '**/*.js'
        ]);
    }

    function concatCss() {
        config('concat:ng_modules_css', '.css', [
            '**/*.css'
        ]);
    }

    function minifyCss() {
        config('cssmin:ng_modules_css', '.min.css', [
            '**/*.css'
        ]);
    }

    function copyHtml() {
        grunt.config('copy.files', {
            cwd: options.src,
            src: '**/*.html',
            dest: path.join(options.dest, options.viewDir),
            expand: true
        });

        grunt.task.run('copy');
    }

    function cacheHtml() {
        options.modules.forEach(function(module) {
            var name = 'html2js.'+module;

            grunt.task.registerTask(name, 'Create a module for the thing', function(arg1, arg2) {});
            grunt.config(name+'.dest', path.join(options.dest, module + '-templates.min.js'));
            grunt.config(name+'.src', [
                path.join(options.src, module, '**/*.html')
            ]);

            grunt.config(name+'.options.htmlmin', {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            });
        });

        grunt.config('html2js.options.module', function(path, module) {
            return 'templates.'+module;
        });

        grunt.task.run('html2js');
    }

    function minifyCache() {
        grunt.config('uglify.ng_template_js.files', [{
            expand: true,
            cwd: options.dest,
            src: '*-templates.min.js',
            dest: options.dest
        }]);

        grunt.task.run('uglify:ng_template_js');
    }

    // =====================
    // === Register Task ===
    // =====================
    grunt.registerMultiTask('ng_modules', 'An opinionated plugin for organizing Angular source code', function () {
        options = this.options({
            viewDir: 'html',
            cacheViews: false,
            minify: false,
            minifyOnly: false
        });
        options.src = this.data.src;
        options.dest = this.data.dest;
        options.modules = options.modules || fs.readdirSync(options.src);
        options.minify = options.minify || options.minifyOnly;

        if(!options.minifyOnly) {
            concatJs();
            concatCss();
        }

        if(options.minify === true) {
            minifyJs();
            minifyCss();
        }

        if(options.cacheViews) {
            cacheHtml();
            minifyCache();
        } else {
            copyHtml();
        }
    });

};
