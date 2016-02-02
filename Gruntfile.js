module.exports = function(grunt) {
  grunt.initConfig({
    jscs: {
      src: ['resources/**/*.js', 'gulpfile.js'],
      options: {
        config: '.jscsrc'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['resources/**/*.js', 'gulpfile.js'],
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jscs', 'jshint']);
};
