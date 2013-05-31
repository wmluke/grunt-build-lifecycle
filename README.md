# grunt-build-lifecycle

> Build lifecycle for grunt

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-build-lifecycle --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-build-lifecycle');
```

## The "build_lifecycle" task

### Overview
In your project's Gruntfile, add a section named `lifecycle` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    lifecycle: {
        validate: [
            'jshint',
            'csslint'
        ],
        compile: [
            'coffee',
            'compass'
        ],
        test: [
            'connect:test',
            'karma:unit'
        ],
        package: [
            'concat',
            'uglify'
        ],
        integrationTest: [
            'karma:e2e'
        ],
        verify: [],
        install: [],
        deploy: [
            'server'
        ]
    }
});
```

This will create the following grunt tasks: `validate`, `compile`, `test`, `package`, `integration-test`, `verify`, `install`, and `deploy`.  Running any of these task will run all the preceding lifecycle task sequentially.

For example, `grunt test` runs the `validate`, `compile`, and `test` tasks.

You can run build phases individually with `grunt phase-<name>`, where name is one of the lifecycles.

For example, based on the above example `grunt phase-compile` runs the `coffee` and `compass` tasks.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
