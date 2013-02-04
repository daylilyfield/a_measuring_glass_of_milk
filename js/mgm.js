(function(global, initialize) {

    if (!messageBus || !stateMgr || !noteMgr) {
        setTimeout(arguments.callee.bind(global, global, initialize), 1000);
    } else {
        initialize(mgm);
    }
}(this, function(mgm) {
    
    var model = new mgm.DetailsActualDurationModel();
    var view = new mgm.DetailsActualDurationView(model);
}));
