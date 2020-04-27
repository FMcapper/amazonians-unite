const path = require('path');
const _ = require('lodash');
const ghpages = require('gh-pages');


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    //we process the sass files from bootstrap, giving us the ability to modify 
    //the templates (for example, using a different grid layout, or adjusting gutters, or default fonts)
    'dart-sass': {
      target: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          './dist/css/style.css': './src/scss/bootstrap_variables.scss',
          './dist/css/audiostyles.css': './src/scss/audiostyles.scss'
        }
      }
    },


    /*
     * Download local copies of Google fonts, this way we don't rely on Google's servers
     * and have better privacy. Google's license allows for local copies. 
     * https://developers.google.com/fonts/faq
     *
     * In addition to changing the fonts here, you'll need to
     * edit the variables in scss/bootstrap_variables.scss to match the fonts you specify.
     */
    googlefonts: {
      build: {
        options: {
          fontPath: 'src/fonts/',
          httpPath: '../fonts/',
          cssFile: 'src/fonts/fonts.css',
          fonts: [

            //add additional fonts here if you wish
            {
              family: 'Lato',
              styles: [
                100, 400, 700, 900
              ]
            },
            {
              family: 'Crimson Text',
              styles: [
                400, 600
              ]            
            }
          ]
        }
      }
    },

    //remove the dist (build) folder and start over.
    clean:{
      dist: ['dist/**/*']
    },

    //copy the fonts, js and assets folder (no css, because we process sass first)
    copy: {
      js: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'], 
        dest: 'dist/' 
      },
      fonts:{
        expand: true,
        cwd: 'src/',
        src: ['fonts/**/*'], 
        dest: 'dist/'
      },
      html: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.html'],
        dest: 'dist/'  
      },
      assets: {
        expand: true,
        cwd: 'src/',
        src: ['assets/**/*'],
        dest: 'dist/'      
      }
    },


    //watch for changes, and do a different action depending on situation
    watch: {
      options: {
        spawn: false,
        event: ['all'],
        livereload: true,
        cwd: 'src/'
      },
      scripts: {
        files: '**/*.js',
        tasks: ['copy:js']
      },
      styles: {
        files: ['css/**/*.css', 'scss/**/*.scss'],
        tasks: ['dart-sass']
      },
      html: {
        files: ['**/*.html'],
        tasks: ['copy:html']
      },
      assets: {
        files: 'assets/**/*',
        tasks: ['copy:assets']
      }
    },

    //make a webserver on the dist folder
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          livereload: true,
          base: "./dist"
        }
      }
    }


  });


  //This will publish a copy of this project to gh-pages branch so students can see it.
  grunt.registerTask('publish', 'Publish project to gh-pages', ()=>{
    ghpages.publish('dist',  {push: true}, function(err){
      grunt.log.writeln(err);
    });
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-google-fonts');

  //intial setup, really only need to run this once unless adding new Google Fonts
  grunt.registerTask('setup', ['clean', 'googlefonts', 'copy:fonts', 'default']);

  //create build folder and run watch task
  grunt.registerTask('default', ['copy:assets','copy:js','copy:html','dart-sass','connect','watch']);

};