'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.build_lifecycle = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    test1: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test1.log').trim();
        var expected = grunt.file.read('test/expected/test1.log').trim();
        test.equal(actual, expected, 'should describe what the default behavior is.');

        test.done();
    }
//    test2: function (test) {
//        test.expect(1);
//
//        var actual = grunt.file.read('tmp/test2.log').trim();
//        var expected = grunt.file.read('test/expected/test2.log').trim();
//        test.equal(actual, expected, 'should describe what the default behavior is.');
//
//        test.done();
//    }
};
