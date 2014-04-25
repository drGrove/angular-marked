module.exports = function(grunt){
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    jshint: {
      options: { jshintrc: true },
      all: ['gruntfile.js', '<%= pkg.name %>.js']
    },
    release: {
      options: {
        file: 'bower.json',
        npm: false
      }
    },
    bump: {
      options: {
        files: ['bower.json','package.json'],
        commit: true,
        commitMessage: 'release %VERSION%',
        commitFiles: ['package.json','<%= pkg.name %>.min.js'], // '-a' for all files
        pushTo: 'origin',
      }
    }
    uglify: {
      options: {
        banner: '/*\n * <%= pkg.title || pkg.name %>\n' +
          ' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors.join(" ") %>\n' +
          ' * Licensed <%= pkg.license %>\n */\n'
      },
      src: {
        files: {
          '<%= pkg.name %>.min.js': '<%= pkg.name %>.js'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      once: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build','test']);
  grunt.registerTask('build', ['jshint', 'uglify']);
  grunt.registerTask('test', ['karma:once']);
  grunt.registerTask('publish', ['build','test','bump']);

};