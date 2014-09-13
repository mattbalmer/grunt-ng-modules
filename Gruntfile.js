/*
 * grunt-ng-modules
 * https://github.com/matt/grunt-ng-modules
 *
 * Copyright (c) 2014 Matt Balmer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },


        // Dependency Tasks
        copy: {},
        concat: {
            options: {
                separator: '\n\n'
            },
            ng_modules_js: {},
            ng_modules_css: {}
        },
        uglify: {
            ng_modules_js: {},
            ng_template_js: {}
        },
        cssmin: {
            ng_modules_css: {}
        },
        html2js: {},

        // Configuration to be run (and then tested).
        ng_modules: {
            options: {
                minify: true,
                viewDir: 'partials'
            },
            modules: {
                src: 'test/modules',
                dest: 'tmp'
            },
            template_modules: {
                options: {
                    cacheViews: true
                },
                src: 'test/modules',
                dest: 'tmp'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test*.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'ng_modules', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
