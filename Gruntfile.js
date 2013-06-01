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
            'integration-test': ['echo:integration-test'],
            verify: ['echo:verify'],
            install: ['echo:install'],
            deploy: ['echo:deploy']
        },

        shell: {
            mkdirTmp: {
                command: 'mkdir tmp'
            },
            test1: {
                command: 'grunt install --logfile=tmp/test1.log'
            },
            test2: {
                command: 'grunt deploy --skip=validate,test --logfile=tmp/test2.log'
            },
            test3: {
                command: 'grunt deploy --skipMatch=test --logfile=tmp/test3.log'
            },
            test4: {
                command: 'grunt phase-compile --logfile=tmp/test4.log'
            }

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
