/*
 * grunt-build-lifecycle
 * https://github.com/wmluke/grunt-build-lifecycle
 *
 * Copyright (c) 2013 Luke Bunselmeyer
 * Licensed under the MIT license.
 */


module.exports = function (grunt) {
    'use strict';

    var _ = require('underscore');

    var buildPhases = [
        'phase-validate',
        'phase-compile',
        'phase-test',
        'phase-package',
        'phase-integration-test',
        'phase-verify',
        'phase-install',
        'phase-deploy'
    ];

    function createBuildPhaseTask(phase) {
        var phases = grunt.config.get('lifecycle.' + phase) || [];
        return phases.length === 0 ? [] : function () {
            grunt.task.run(phases);
        };
    }

    function createBuildCycleTask(phase) {
        var index = buildPhases.indexOf('phase-' + phase);
        var skip = _.chain((grunt.option('skip') || '').split(','))
            .compact()
            .map(function (phase) {
                return 'phase-' + phase.trim()
            })
            .value();

        if (grunt.option('skipTests')) {
            skip.push('phase-test');
            skip.push('phase-integration-test');
        }

        var phases = index > -1 ? buildPhases.slice(0, index + 1) : [];
        return function () {
            grunt.log.writeln('Skipping build phases: ' + grunt.log.wordlist(skip));
            grunt.task.run(_(phases).difference(skip));
        };
    }

    /**
     * Define build phase tasks
     */

    grunt.registerTask('phase-validate', createBuildPhaseTask('validate'));
    grunt.registerTask('phase-compile', createBuildPhaseTask('compile'));
    grunt.registerTask('phase-test', createBuildPhaseTask('test'));
    grunt.registerTask('phase-package', createBuildPhaseTask('package'));
    grunt.registerTask('phase-integration-test', createBuildPhaseTask('integration-test'));
    grunt.registerTask('phase-verify', createBuildPhaseTask('verify'));
    grunt.registerTask('phase-install', createBuildPhaseTask('install'));
    grunt.registerTask('phase-deploy', createBuildPhaseTask('deploy'));

    /**
     * Define build cycle tasks
     */

    grunt.registerTask('validate', createBuildCycleTask('validate'));
    grunt.registerTask('compile', createBuildCycleTask('compile'));
    grunt.registerTask('test', createBuildCycleTask('test'));
    grunt.registerTask('package', createBuildCycleTask('package'));
    grunt.registerTask('integration-test', createBuildCycleTask('integration-test'));
    grunt.registerTask('verify', createBuildCycleTask('verify'));
    grunt.registerTask('install', createBuildCycleTask('install'));
    grunt.registerTask('deploy', createBuildCycleTask('deploy'));
};
