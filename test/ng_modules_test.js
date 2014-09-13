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

exports.ng_modules = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    js_concat: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test-module.js');
        var expected = grunt.file.read('test/expected/test-module.js');
        test.equal(actual, expected, 'JS concat should work.');

        test.done();
    },
    js_minify: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test-module.min.js');
        var expected = grunt.file.read('test/expected/test-module.min.js');
        test.equal(actual, expected, 'JS minification should work.');

        test.done();
    },
    css_concat: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test-module.css');
        var expected = grunt.file.read('test/expected/test-module.css');
        test.equal(actual, expected, 'CSS concat should work.');

        test.done();
    },
    css_minify: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/test-module.min.css');
        var expected = grunt.file.read('test/expected/test-module.min.css');
        test.equal(actual, expected, 'CSS minification should work.');

        test.done();
    },
    html_copy: function (test) {
        test.expect(2);

        var actual = grunt.file.read('tmp/partials/test-module/directives/link/link.html');
        var expected = grunt.file.read('test/modules/test-module/directives/link/link.html');
        test.equal(actual, expected, 'Html copy (link.html) should have copied');

        actual = grunt.file.read('tmp/partials/test-module/directives/menu/menu.html');
        expected = grunt.file.read('test/modules/test-module/directives/menu/menu.html');
        test.equal(actual, expected, 'Html copy (menu.html) should have copied');

        test.done();
    }
};
