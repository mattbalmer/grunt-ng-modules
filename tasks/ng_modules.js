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
    function customize(extension, sources, destDir) {
        var result = {};
        destDir = destDir || '';

        for(var i = 0, len = options.modules.length; i < len; i++) {
            // Loop through the modules array, and add a Key-Value pair
            // to the results, where the Key is the fully built destination path,
            // and the source is the fully built array of source paths
            var module = options.modules[i],
                _dest = path.join(options.dest, destDir, module + extension);

            result[_dest] = sources.map(function(_src) {
                return path.join(options.src, module, _src)
            });
        }

        return result;
    }

    function config(task, dir, extension, sources) {
        var configName = task.replace(/:/gi, '.') + '.files';

        grunt.config(configName,
            customize(extension, sources, dir)
        );

        grunt.task.run(task);
    }

    // =====================
    // === Task Building ===
    // =====================
    function concatJs() {
        config('concat:ng_modules_js', options.jsDir, '.js', [
            '**/module.js',
            '**/*.js'
        ]);
    }

    function minifyJs() {
        config('uglify:ng_modules_js', options.jsDir, '.min.js', [
            '**/module.js',
            '**/*.js'
        ]);
    }

    function concatCss() {
        config('concat:ng_modules_css', options.cssDir, '.css', [
            '**/*.css'
        ]);
    }

    function minifyCss() {
        config('cssmin:ng_modules_css', options.cssDir, '.min.css', [
            '**/*.css'
        ]);
    }

    function copyHtml() {
        grunt.config('copy.ng_modules_html', {
            cwd: options.src,
            src: '**/*.html',
            dest: path.join(options.dest, options.viewDir),
            expand: true
        });

        grunt.task.run('copy:ng_modules_html');
    }

    function cacheHtml() {
        options.modules.forEach(function(module) {
            var name = 'html2js.'+module;

            grunt.task.registerTask(name, 'Create templateCache files for the html', function() {});
            grunt.config(name+'.dest', path.join(options.dest, options.jsDir, module + '-templates.min.js'));
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

            grunt.config(name+'.options.base', options.src);
            grunt.config(name+'.options.rename', function(name) {
                return '/'+options.viewDir+'/' + name;
            });
            grunt.config(name+'.options.singleModule', true);
            grunt.config(name+'.options.module', function(path, module) {
                return 'templates.'+module;
            });

            grunt.task.run(name.replace(/\./g, ':'));
        });
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
        // === Load dependent tasks
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-html2js');

        // === Set options
        options = this.options({
            viewDir: 'html',
            cssDir: '',
            jsDir: '',
            cacheViews: false,
            minify: false
        });
        options.src = this.data.src;
        options.dest = this.data.dest;
        options.modules = options.modules || fs.readdirSync(options.src);

        // If options.minify is set in some way - propagate it
        if(typeof options.minify === 'boolean' || typeof options.minify === 'string') {
            options.minify = {
                js: options.minify,
                css: options.minify
            }
        } else if(typeof options.minify === 'object') {
            options.minify.js = options.minify.js || false;
            options.minify.css = options.minify.css || false;
        }

        // === Run the task
        if(options.minify.js !== 'only') {
            concatJs();
        }
        if(options.minify.css !== 'only') {
            concatCss();
        }

        if(options.minify.js === true) {
            minifyJs();
        }
        if(options.minify.css === true) {
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
