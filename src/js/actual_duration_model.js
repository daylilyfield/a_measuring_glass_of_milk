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

    mgm.DetailsActualDurationModel = function(noteMgr, stateMgr, transMgr) {
        this._tasksActualDurations = {}; // [{from: ..., to: ...}, {from: ..., to: ...}]
        this._noteMgr = noteMgr;
        this._stateMgr = stateMgr;
        this._transMgr = transMgr;
    };

    mgm.DetailsActualDurationModel.prototype.isRecording = function(taskId) {
        var data = this._readMgmNoteIfNeeded(taskId);
        return data && data.length > 0 && !data.slice(-1)[0].to;
    };

    mgm.DetailsActualDurationModel.prototype.getActualDuration = function(taskId) {
        var data = this._readMgmNoteIfNeeded(taskId),
            length = data.length,
            actual = 0;
        for (var i = 0; i < length; i++) {
            var duration = data[i];
            if (duration.from && duration.to) {
                actual += duration.to.getTime() - duration.from.getTime();
            }
        }
        return actual;
    };

    mgm.DetailsActualDurationModel.prototype.getStartTime = function(taskId) {
        if (this.isRecording(taskId)) {
            var seriesId = this._findSeriesId(taskId);
            return this._tasksActualDurations[seriesId].slice(-1)[0].from.getTime();
        } else {
            throw new Error('task is not started');
        }
    };

    mgm.DetailsActualDurationModel.prototype.refresh = function(noteId) {
        var note = this._stateMgr.notes[noteId];
        if (note) {
            delete this._tasksActualDurations[note.task_series_id];
            this._readMgmNoteIfNeeded(taskId);
        }
    };

    mgm.DetailsActualDurationModel.prototype._readMgmNoteIfNeeded = function(taskId) {
        var seriesId = this._findSeriesId(taskId);
        if (seriesId in this._tasksActualDurations) {
            return this._tasksActualDurations[seriesId];
        }
        var notes = this._getNotesBySeriesId(seriesId);
        if (notes && notes.length > 0) {
            var note = this._findMgmNote(notes);
            if (!note) {
                return this._tasksActualDurations[seriesId] = [];
            } else {
                var content = this._readMgmNoteContent(note.content);
                return this._tasksActualDurations[seriesId] = content;
            }
        } else {
            return this._tasksActualDurations[seriesId] = [];
        }
    };

    mgm.DetailsActualDurationModel.prototype._getNotesBySeriesId = function(seriesId) {
        if (!this._noteMgr.index) {
            this._noteMgr.prepareIndex();
        }
        var noteIds = this._noteMgr.index[seriesId];
        return !noteIds ? [] : noteIds.map(function(value) {
            return this._stateMgr.notes[value];
        }.bind(this));
    };

    mgm.DetailsActualDurationModel.prototype._findSeriesId = function(taskId) {
        return this._stateMgr.tasks[taskId].series_id;
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

    mgm.DetailsActualDurationModel.prototype._readMgmNoteContent = function(content) {
        var durations = content.split('\n'),
            length = durations.length,
            data = [];
        for (var i = 0; i < length; i++) {
            var ft = durations[i].split(',');
            if (ft.length == 2) {
                var from = new Date(ft[0]),
                    to = new Date(ft[1]);
                if (!isNaN(from) && !isNaN(to)) {
                    data.push({from: from, to: to});
                } else if (!isNaN(from) && isNaN(to)) {
                    data.push({from: from});
                }
            }
        }
        return data;
    };

    mgm.DetailsActualDurationModel.prototype.startRecording = function(taskId) {
        if (!this.isRecording(taskId)) {
            var now = new Date(),
                seriesId = this._findSeriesId(taskId),
                notes = this._getNotesBySeriesId(seriesId),
                mgmNote = this._findMgmNote(notes),
                content = (mgmNote ? mgmNote.content + '\n' : '') + now.toISOString() + ',';
            this._updateMgmNote(taskId, content, mgmNote && mgmNote.id);
            this._tasksActualDurations[seriesId] = this._readMgmNoteContent(content);
        }
    };

    mgm.DetailsActualDurationModel.prototype.stopRecording = function(taskId) {
        if (this.isRecording(taskId)) {
            var now = new Date(),
                seriesId = this._findSeriesId(taskId),
                notes = this._getNotesBySeriesId(seriesId),
                mgmNote = this._findMgmNote(notes),
                content = mgmNote.content + now.toISOString(),
                recent = content.split('\n').pop(),
                data = this._readMgmNoteContent(content).slice(-1)[0],
                from = data && data.from,
                to = data && data.to,
                duration = to.getTime() - from.getTime();
            if (duration > 0 && duration < 60 * 1000) {
                var lines = content.split('\n'),
                    length = lines.length;
                content = length == 1 ? '' : lines.slice(0, length - 1).join('\n');
            }
            this._updateMgmNote(taskId, content, mgmNote && mgmNote.id);
            this._tasksActualDurations[seriesId] = this._readMgmNoteContent(content);
            return this.getActualDuration(taskId);
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
        this._transMgr.request(method, utility.encodeJavaScript(parameter));
    };

}(mgm));
