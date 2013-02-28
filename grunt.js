module.exports = function(grunt) {

    grunt.initConfig({
    
        copy: {
            target: {
                files: {
                    "target/js/component/mustache/mustache.js": "src/js/component/mustache/mustache.js",
                    "target/js/": "src/js/*",
                    "target/css/": "src/css/*",
                    "target/manifest.json": "src/manifest.json"
                }
            }
        },

        crx: {
            build: {
                src: 'target/',
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
