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

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'ng_modules', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
