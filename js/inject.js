(function(links) {
    var root = links.reverse().map(function(value) {
        var link = chrome.extension.getURL(value);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = link;
        return script;
    }).reduce(function(previous, current) {
        current.onload = function() {
            document.body.appendChild(previous);
        };
        return current;
    });
    document.body.appendChild(root);
}([
    'js/namespace.js',
    'js/actual_duration_model.js',
    'js/actual_duration_view.js',
    'js/mgm.js'
]));
