// --------------------------------------------------------------------------- 
// Copyright (c) 2013, DAYLILYFIELD {{{
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation 
// the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the 
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE. }}}
// --------------------------------------------------------------------------- 

(function(global, mgm, initialize) {

    if (!messageBus || !stateMgr || !noteMgr || !transMgr || !configurationMgr) {
        setTimeout(arguments.callee.bind(global, global, mgm, initialize), 500);
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

    var selected = configurationMgr.language.selectedOptions[0].getAttribute('value');
    mgm.i18n.load(selected);

    var model = new mgm.DetailsActualDurationModel(noteMgr, stateMgr, transMgr);
    var view = new mgm.DetailsActualDurationView(model, messageBus, stateMgr);
}));
