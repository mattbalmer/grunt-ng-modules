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
                dest = path.join(options.dest, module + extension),
                src = sources.map(function(src) {
                    return path.join(options.src, module, src)
                });

            result[dest] = src;
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

    // =====================
    // === Register Task ===
    // =====================
    grunt.registerTask('ng_modules', 'An opinionated plugin for organizing Angular source code', function () {
        options = this.options({
            src: '',
            dest: '',
            viewDir: 'html',
            minify: false,
            minifyOnly: false
        });
        options.modules = options.modules || fs.readdirSync(options.src);
        options.minify = options.minify || options.minifyOnly;

        if(!options.minifyOnly) {
            concatJs(options);
            concatCss(options);
        }

        if(options.minify === true) {
            minifyJs(options);
            minifyCss(options);
        }

        copyHtml(options);
    });

};
