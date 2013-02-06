(function(global, mgm, initialize) {

    if (!messageBus || !stateMgr || !noteMgr) {
        setTimeout(arguments.callee.bind(global, global, mgm, initialize), 1000);
    } else {
        initialize(mgm);
    }
}(this, mgm, function(mgm) {
    
    noteMgr.completeNewNote = function(noteId, hash) {
        var exists = !!this.noteHashMap[hash] || !!this.noteMap[noteId];
        if (exists) {
            NoteManager.prototype.completeNewNote.apply(noteMgr, arguments);
        }
    };

    var model = new mgm.DetailsActualDurationModel();
    var view = new mgm.DetailsActualDurationView(model);
}));
