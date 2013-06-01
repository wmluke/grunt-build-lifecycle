'use strict';

var grunt = require('grunt');

exports.build_lifecycle = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    'test full build cycle': function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test1.log').trim();
        var expected = grunt.file.read('test/expected/test1.log').trim();
        test.equal(actual, expected, 'should run all the build cycles');

        test.done();
    },
    'test --skip option': function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test2.log').trim();
        var expected = grunt.file.read('test/expected/test2.log').trim();
        test.equal(actual, expected, 'should skip validate and test phases');

        test.done();
    },
    'test --skipMatch option': function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test3.log').trim();
        var expected = grunt.file.read('test/expected/test3.log').trim();
        test.equal(actual, expected, 'should skip test phases');

        test.done();
    },
    'test phase task': function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test4.log').trim();
        var expected = grunt.file.read('test/expected/test4.log').trim();
        test.equal(actual, expected, 'should only run the compile phase');

        test.done();
    }
};
