module.exports = function(grunt) {

    grunt.initConfig({
    
        copy: {
            lib: {
                files: {
                    "src/js/mustache.js": "node_modules/mustache/mustache.js"
                }
            }
        },

        crx: {
            build: {
                src: 'src/',
                dest: 'dest/',
                privateKey: 'mgm.pem',
                filename: 'mgm.crx'
            }
        }
    
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-crx');
    
    grunt.registerTask('default', 'copy crx');
};
