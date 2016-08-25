module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { // grunt concat:build
      build: {
        options: {separator: ';'},
        files: {
          'public/dist/libs.js': ['public/lib/underscore.js', 'public/lib/jquery.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'],
          'public/dist/client.js': ['public/client/app.js', 'public/client/link.js', 'public/client/links.js', 'public/client/linkView.js', 'public/client/linksView.js', 'public/client/createLinkView.js', 'public/client/router.js']
        }
          // src: ['public/client/*.js'],
          // dest: 'public/dist/built.js'
      },
      // lib: {
      //   options: {separator: ';'},
      //   dist: {
      //     src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'],
      //     dest: 'public/dist/libs.js'
      //   }
      // }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      js: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js'],
          'public/dist/libs.min.js': ['public/dist/libs.js']
        }
      },
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css'] 
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat', 'uglify', 'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'nodemon'
    // add your deploy tasks here
  ]);


};
