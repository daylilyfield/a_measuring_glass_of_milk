module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-crx');
    
    grunt.initConfig({
    
        crx: {
            build: {
                src: 'src/',
                dest: 'dest/',
                privateKey: 'mgm.pem',
                filename: 'mgm.crx'
            }
        }
    
    });

    grunt.registerTask('default', 'crx:build');
};
