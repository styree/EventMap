/*
* grunt-cli
* http://gruntjs.com/
*
* Copyright (c) 2012 Tyler Kellen, contributors
* Licensed under the MIT license.
* https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
*/

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'bin/*',
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true
            }
        },

        //server task
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '.',
                    open: true
                }
            }
        },

        //sass compile
        sass: {
            dist: {
                files: {
                    'styles/build/style.css' : 'styles/src/styles.scss'
                }
            }
        },

        //watch sass and live reload
        watch: {
            css: {
                files: 'styles/src/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true,
                }
            }
        }

    }); // end config

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // "npm test" runs these tasks
    grunt.registerTask('test', ['jshint']);

    // Default task.
    grunt.registerTask('default', ['test']);

    //server and watch attempt
    grunt.registerTask('serve', ['sass', 'connect', 'watch:css']);

    grunt.registerTask('serveProd', ['connect']);


};
