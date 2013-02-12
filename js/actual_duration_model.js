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

(function(mgm) {

    var MGM_NOTE_TITLE = 'Measuring Glass';

    mgm.DetailsActualDurationModel = function() {
        this._tasksInRecording = {};
        this._tasksActualDurationCache = {};
    };

    mgm.DetailsActualDurationModel.prototype.getActualDuration = function(taskId) {
        if (taskId in this._tasksInRecording) {
            return task._tasksInRecording[taskId];
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
                if (!~duration) {
                    this._tasksInRecording[taskId] = true;
                    return duration;
                } else {
                    return this._tasksActualDurationCache[taskId] = duration;
                }
            }
        } else {
            return this._tasksActualDurationCache[taskId] = 0;
        }
    };

    mgm.DetailsActualDurationModel.prototype._getNotesByTaskId = function(taskId) {
        if (!noteMgr.index) return [];
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
        if (!note) return 0;
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
                    return -1;
                }
            } else {
                return 0;
            }
        }
        return actual;
    };

    mgm.DetailsActualDurationModel.prototype.startRecording = function(taskId) {
        if (!this.isRecording(taskId)) {
            this._tasksInRecording[taskId] = true;
            var now = new Date(),
                notes = this._getNotesByTaskId(taskId),
                mgmNote = this._findMgmNote(notes),
                content = (mgmNote ? mgmNote.content + '\n' : '') + now.toISOString() + ',';
            this._updateMgmNote(taskId, content, mgmNote && mgmNote.id);
        }
    };

    mgm.DetailsActualDurationModel.prototype.stopRecording = function(taskId) {
        if (this.isRecording(taskId)) {
            var now = new Date(),
                notes = this._getNotesByTaskId(taskId),
                mgmNote = this._findMgmNote(notes),
                content = mgmNote.content + now.toISOString(),
                recent = content.split('\n').pop(),
                duration = this._calculateActualDuration({content: recent});
            if (duration > 0 && duration < 60 * 1000) {
                var lines = content.split('\n'),
                    length = lines.length;
                content = length == 1 ? '' : lines.slice(0, length - 1).join('\n');
            }
            this._updateMgmNote(taskId, content, mgmNote && mgmNote.id);
            delete this._tasksInRecording[taskId];
            return this._tasksActualDurationCache[taskId] = this._calculateActualDuration({content: content});
        }
    };

    mgm.DetailsActualDurationModel.prototype._updateMgmNote = function(taskId, content, noteId) {
        var method = 'notes.add';
        var parameter = {
            task: control.taskSeriesMap([taskId]), 
            title: MGM_NOTE_TITLE,
            content: content
        };

        if (noteId) {
            method = 'notes.edit';
            parameter.note = noteId;
        } else {
            var hash = hex_sha1(Math.random() * 10000 + content);
            parameter.hash = hash;
        }
        transMgr.request(method, utility.encodeJavaScript(parameter));
    };

    mgm.DetailsActualDurationModel.prototype.isRecording = function(taskId) {
        var nowInRecording = taskId in this._tasksInRecording;
        if (!nowInRecording) {
            var notes = this._getNotesByTaskId(taskId),
                mgmNote = this._findMgmNote(notes),
                duration = this._calculateActualDuration(mgmNote);
            if (!~duration) {
                nowInRecording = this._tasksInRecording[taskId] = true;
            }
        }
        return nowInRecording;
    };

}(mgm));
