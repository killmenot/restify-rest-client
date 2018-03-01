module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      files: {
        src: [
          'examples/*.js',
          'src/**/*.js',
          'test/**/*.js',
          'Gruntfile.js'
        ]
      },
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.registerTask('default', ['jshint']);
};
