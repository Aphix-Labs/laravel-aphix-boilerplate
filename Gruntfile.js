module.exports = function(grunt) {
  grunt.initConfig({
    jscs: {
      src: ['resources/**/*.js', 'gulpfile.js'],
      options: {
        config: '.jscsrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('default', ['jscs']);
};
