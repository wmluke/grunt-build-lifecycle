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

    var buildPhases = _.chain(grunt.config.get('lifecycle')).keys().value();

    function createBuildPhaseTask(phase) {
        var phaseTasks = grunt.config.get('lifecycle.' + phase) || [];
        return phaseTasks.length === 0 ? [] : function () {
            grunt.task.run(phaseTasks);
        };
    }

    function createBuildCycleTask(phase) {
        var index = buildPhases.indexOf(phase);
        var skip = _.chain((grunt.option('skip') || '').split(','))
            .compact()
            .map(function (phase) {
                return phase.trim()
            })
            .value();

        if (grunt.option('skipTests')) {
            skip.push('phase-test');
            skip.push('phase-integration-test');
        }

        var phases = index > -1 ? buildPhases.slice(0, index + 1) : [];
        return function () {
            grunt.log.writeln('Skipping build phases: ' + grunt.log.wordlist(skip));
            grunt.task.run(_.chain(phases)
                .difference(skip)
                .map(function (phase) {
                    return 'phase-' + phase;
                }).value()
            );
        };
    }

    _.each(buildPhases, function (phase) {
        /**
         * Define build phase tasks
         */
        grunt.registerTask('phase-' + phase, createBuildPhaseTask(phase));

        /**
         * Define build cycle tasks
         */
        grunt.registerTask(phase, createBuildCycleTask(phase));

    });
};
