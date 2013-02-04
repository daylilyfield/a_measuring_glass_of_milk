(function(mgm) {

    var MGM_NOTE_TITLE = 'Measuring Glass';

    mgm.DetailsActualDurationModel = function() {
        this._tasksInRecording = {};
        this._tasksActualDurationCache = {};
    };

    mgm.DetailsActualDurationModel.prototype.getActualDuration = function(taskId) {
        if (taskId in this._tasksInRecording) {
            return -1; // now recording
        }
        if (taskId in this._tasksActualDurationCache) {
            return this._tasksActualDurationCache[taskId];
        }

        var notes = this._getNotesByTaskId(taskId);
        if (notes && notes.length > 0) {
            var note = this._findMgmNote(notes);
            if (!note) {
                return this._tasksActualDurationCache[taskId] = 0;
            } else {
                var duration = this._calculateActualDuration(note);
                return this._tasksActualDurationCache[taskId] = duration;
            }
        } else {
            return this._tasksActualDurationCache[taskId] = 0;
        }
    };

    mgm.DetailsActualDurationModel.prototype._getNotesByTaskId = function(taskId) {
        var seriesId = stateMgr.tasks[taskId].series_id;
        var noteIds = noteMgr.index[seriesId];
        return !noteIds ? [] : noteIds.map(function(value) {
            return stateMgr.notes[value];
        });
    };

    mgm.DetailsActualDurationModel.prototype._findMgmNote = function(notes) {
        var length = notes.length,
            note;
        for (var i = 0; i < length; i++) {
            if (notes[i].title == MGM_NOTE_TITLE) {
                note = notes[i];
                break;
            }
        }
        return note;
    };

    mgm.DetailsActualDurationModel.prototype._calculateActualDuration = function(note) {
        var durations = note.content.split('\n'),
            length = durations.length,
            actual = 0;
        for (var i = 0; i < length; i++) {
            var ft = durations[i].split(',');
            if (ft.length == 2) {
                var from = new Date(ft[0]),
                    to = new Date(ft[1]);
                if (!isNaN(from) && !isNaN(to)) {
                    actual += to.getTime() - from.getTime();
                } else if (!isNaN(from) && isNaN(to)) {
                    console.log('invalid mgm state. encounted unexpected recording task: ' + durations[i]);
                    return 0;
                }
            } else {
                console.log('invalid mgm note format:' + durations[i]);
                return 0;
            }
        }
        return actual;
    };

    mgm.DetailsActualDurationModel.prototype.startRecording = function(taskId) {
        if (!this.isRecording(taskId)) {
            this._tasksInRecording[taskId] = true;
            var current = new Date;
            var notes = this._getNotesByTaskId(taskId);
            var mgmNote = this._findMgmNote(notes);
            var content = (mgmNote ? mgmNote.content + '\n' : '') + current.toISOString() + ',';
            this._updateMgmNote(taskId, content, mgmNote && mgmNote.id);
        }
    };

    mgm.DetailsActualDurationModel.prototype.stopRecording = function(taskId) {
        if (this.isRecording(taskId)) {
            var current = new Date;
            var notes = this._getNotesByTaskId(taskId);
            var mgmNote = this._findMgmNote(notes);
            // if mgm note is absent ... what should i do?
            var content = (mgmNote ? mgmNote.content + '\n' : '') + current.toISOString();
            this._updateMgmNote(taskId, content, mgmNote && mgmNote.id);
            delete this._tasksInRecording[taskId];
        }
    };

    mgm.DetailsActualDurationModel.prototype._updateMgmNote = function(taskId, content, noteId) {
        var method = 'notes.add';
        var hash = hex_sha1(Math.random() * 10000 + content);
        var parameter = {
            task: control.taskSeriesMap([taskId]), 
            title: MGM_NOTE_TITLE,
            content: content,
            //hash: hash
        };

        if (noteId) {
            method = 'notes.edit';
            parameter.note = noteId;
        }
        transMgr.request(method, utility.encodeJavaScript(parameter));
    };

    mgm.DetailsActualDurationModel.prototype.isRecording = function(taskId) {
        return taskId in this._tasksInRecording;
    };

}(mgm));
