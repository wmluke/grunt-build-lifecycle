/*
 * grunt-build-lifecycle
 * https://github.com/wmluke/grunt-build-lifecycle
 *
 * Copyright (c) 2013 Luke Bunselmeyer
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

        lifecycle: {
            validate: ['echo:validate'],
            compile: ['echo:compile'],
            test: ['echo:test'],
            package: ['echo:package'],
            integrationTest: ['echo:integrationTest'],
            verify: ['echo:verify'],
            install: ['echo:install'],
            deploy: ['echo:deploy']
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
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
    grunt.registerTask('test', ['clean', 'deploy', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

    grunt.registerTask('echo', function (message) {
        grunt.log.writeln(message);
        //grunt.file.write('./tmp/');
    });

};
