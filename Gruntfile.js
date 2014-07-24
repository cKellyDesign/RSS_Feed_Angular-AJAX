module.exports = function (grunt) {
  grunt.initConfig({
    
    sass: {
      dist: {
        files: {
          'style.css' : 'style.scss'
        },
        dev: {
          options: {
            sourceMap: true
          },
          files: {
            'style.css' : 'style.scss'
          }
        }
      }
    },

    watch: {
      css: {
        files: '*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: '*.js',
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          keepalive: false,
          livereload: true
            
          
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'connect', 'watch']);
};