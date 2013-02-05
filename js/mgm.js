(function(global, mgm, initialize) {

    if (!messageBus || !stateMgr || !noteMgr) {
        setTimeout(arguments.callee.bind(global, global, mgm, initialize), 1000);
    } else {
        initialize(mgm);
    }
}(this, mgm, function(mgm) {
    
    var model = new mgm.DetailsActualDurationModel();
    var view = new mgm.DetailsActualDurationView(model);
}));
