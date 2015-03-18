module.exports = function(grunt){

  // Load plugins 
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  grunt.initConfig({
    connect : {
      server : {
        options : {
          port : 5080,
          base : 'public',
          open : true,
          keepalive : true
        }
      }
    },//connect
    wiredep : {
      task : {
        src : 'public/index.html'
      }
    },//wiredep
    sass : {                             
      dist : {                            
        options : {                       
          style : 'expanded'
        },
        files : {                       
          'public/css/styles.css' : 'public/scss/styles.scss'      
        }
      }
    },//sass
    watch : {
      options : { livereload: true },
      css : {
          files : ['public/scss/*.scss'],
          tasks : ['sass'],
          options : {
              spawn : false,
              livereload : true
          }
      },//css
      html : {
        files : [ 'public/*.html','public/partials/*.html'  ]
      }//html
    }//watch
  })//config 
  grunt.registerTask('server', ['wiredep', 'connect', 'watch'])
  grunt.registerTask('default', ['watch'])
}//module

