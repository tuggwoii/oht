module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
        options: {
            configFile: 'config/eslint.json',
            rulePaths: ['config/rules']
        },
        target: ['src/**/*.js', 'index.js']
    },
    execute: {
      target: {
          src: ['server.js']
      }
    },
    open: {
        dev: {
            path: 'http://127.0.0.1:8000',
            app: 'Chrome'
        }
    },
    sass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'src/static/css/styles.css': 'src/static/css/import.scss',
                'src/static/css/backends.css': 'src/static/css/backend-import.scss'
            }
        }
    },
    watch: {
        css: {
            files: '**/*.scss',
            tasks: ['sass']
        }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-execute');
  grunt.registerTask('default', ['eslint', 'open','execute']);
  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('run', ['open', 'execute']);
  grunt.registerTask('css', ['watch']);
  
};
