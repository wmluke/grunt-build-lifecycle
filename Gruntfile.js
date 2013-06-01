/*
 * grunt-build-lifecycle
 * https://github.com/wmluke/grunt-build-lifecycle
 *
 * Copyright (c) 2013 Luke Bunselmeyer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var FS = require("fs"),
        Path = require("path");

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

        clean: {
            tests: ['tmp/*']
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

        shell: {
            test1: {
                command: 'grunt install --logfile=tmp/test1.log'
            }
//            test2: {
//                command: 'grunt deploy --logfile=tmp/test2.log --skipTests'
//            }

        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });


    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test', ['clean', 'shell', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);

    grunt.registerTask('echo', function (message) {
        var done = this.async();
        var log = grunt.option('logfile');
        console.log(log);
        FS.appendFile(Path.join(__dirname, log), message + "\n", function (err) {
            if (err) {
                grunt.log.writeln(err);
                done();
                return;
            }
            grunt.log.writeln(message);
            done();
        });
    });

};
