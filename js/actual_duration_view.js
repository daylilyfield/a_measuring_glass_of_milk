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

(function(global, mgm) {

    var $ = document.getElementById.bind(document);

    var CONTAINER_NODE_ID = 'detailsactualduration';
    var HIGHLIGHT_NODE_ID = 'detailsactualduration_highlight';
    var VALUE_NODE_ID = 'detailsactualduration_span';
    var ACTION_NODE_ID = 'detailsactualduration_action';
    var ACTION_ICON_NODE_ID = 'detailsactualduration_action_icon';

    var ICON_START = // {{{
            'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAf' +
            'SC3RAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAO' +
            'wwAADsMBx2+oZAAAABp0RVh0U29mdHdhcmUAUGFp' +
            'bnQuTkVUIHYzLjUuMTAw9HKhAAAB0UlEQVQ4T1WS' +
            'y64xQRSF+6H6nTxA/xz+UT+BCAmRMDEhDAyMJCIV' +
            'hEgQt3IZGLhfG+0SgtinVp3UydHJTndX1Vdr7YtG' +
            'RJqK4XCoDwYDs9/vs16vZ3HOrU6nw9rtttlsNvW/' +
            'Z/9CDgHx7XZL1+uVXq+XjMvlQqvVihqNBq/Vag4F' +
            'S1AoAbLv97v4JcL7dDqRbdt0u93kGi6rVqt2pVKR' +
            'MCDY4wo6HA603++pWCySZVm02+0ILhTMGOP5fF7X' +
            'RD6m2lAQAJfriwqFgoTW67UMPKPRiDKZjKmJIjDY' +
            'gCUASsXpdBFCKEgIeSJfuEmlUkzrdrsWinA8HiUE' +
            'hc1mIyCnDI/nP9XrdVosFvKCx+NB8Xjc0kS5JQib' +
            'CsIBQG63hwzjn9ybz+e/qrFYzNJarRZDBWFX5QJb' +
            'brf7A5rNZrLS4/GYotEo00R/TCy+329543K5lLYM' +
            'w5BK2JtOpzSZTOj5fFK5XKZwOGxqoi96qVTiyBEP' +
            'LCEAKQAquBiwgLgIXQ5ALpdzZLNZGz3DgfP5/KuO' +
            'IYASYAHYgUDgZwDUCKXTaUcymeTCurSKnJET+oaW' +
            'CID7fL7PkVNwIpHQI5GIGQqFWDAYtPx+vyUOM6/X' +
            'a4rvjyH/Br2AjHnhB24bAAAAAElFTkSuQmCC';
    // }}}
 
    var ICON_STOP = // {{{
            'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAf' +
            'SC3RAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAO' +
            'wwAADsMBx2+oZAAAABp0RVh0U29mdHdhcmUAUGFp' +
            'bnQuTkVUIHYzLjUuMTAw9HKhAAABvklEQVQ4T3WS' +
            'yYoyMRSF81D1Tq7UVyh1L6KgCLpxo+jChStBJAtR' +
            'BBGnOCxcOI9RywFFxfvn5CdNN3QXXKoqyZdz7sCI' +
            'iJkYjUbWcDi0B4MB7/f7Ugghu90u73Q6dqvVsr6f' +
            '/Q65FCR2ux3dbjd6v986rtcrrddrajabotFouAys' +
            'QaUEyHk8HuqXCO/z+UyO49D9ftdruKxerzu1Wk3D' +
            'gGBPGOh4PNLhcCAppY79fk9wYWDOuSiXyxZT+dhm' +
            '4y9os9kQAs94PKZCoWAzVQQOG7BkVLxeLyE8Hg8F' +
            'AgENIU/kCze5XI6zXq8nUYTT6aRBqAMwAXC1WtFy' +
            'udQXPJ9PSqfTkqlyaxA2AW232y/I7XaT3++nxWKh' +
            'w6imUinJ2u02RwVh1+QCFQAIn8+nofl8ris9mUwo' +
            'mUxypvpjY/Hz+egbjS2jgr3ZbEbT6ZRerxdVq1WK' +
            'x+M2U32xKpWKQI54fgOggosBK0iosPQAlEolV7FY' +
            'dNAzHLhcLl/qGAIoAVaAE4lE/g+AGaF8Pu/KZrNC' +
            'WdcVRM7ICX1TTScFiFAo9HPkDJzJZKxEImHHYjEe' +
            'jUZlOByW6jAPBoO2+v4x5P8AfK+InfCP0EgAAAAA' +
            'SUVORK5CYII=';
    // }}}

    mgm.DetailsActualDurationView = function(model) {
        this._model = model;
        this._createElements();
        this._installEventListeners();
        this._subscribeBroadcastEvent();
    };

    mgm.DetailsActualDurationView.prototype._createElements = function() {
        var title = '時間を計測する (m)',
            label = '計測時間',
            none = 'なし',
            container = document.createElement('div');

        container.id = CONTAINER_NODE_ID;
        container.innerHTML =
           '<span id="' + HIGHLIGHT_NODE_ID + '" ' +
                 'title="' + title + '" ' +
                 'style="padding-top: 2px; padding-bottom: 2px; ">' +
                   label + ': ' +
               '<span class="field" id="' + VALUE_NODE_ID + '">' +
                   none +
               '</span>' +
               '<a id="' + ACTION_NODE_ID + '"' +
                  'href=" "' +
                  'title="' + title + '">' +
                   '<img id="' + ACTION_ICON_NODE_ID + '"' +
                        'class="field_img" ' +
                        'src="data:image/png;base64,' + ICON_START + '"' +
                        'alt="' + title + '" />' +
               '</a>' +
            '</span>';
        $("taskdetails").insertBefore(container, $("detailstags"));

        return container;
    };

    mgm.DetailsActualDurationView.prototype._installEventListeners = function() {
        $(CONTAINER_NODE_ID).addEventListener('click', this._onContainerNodeClicked.bind(this));
    };

    mgm.DetailsActualDurationView.prototype._onContainerNodeClicked = function(event) {
        var taskIds = taskList.getViewList().getSelected(),
            length = taskIds.length;
        for (var i = 0; i < length; i++) {
            var taskId = taskIds[i];
            if (this._model.isRecording(taskId)) {
                this._stopRecording(taskId);
            } else {
                this._startRecording(taskId);
            }
        }
        event.preventDefault();
    };

    mgm.DetailsActualDurationView.prototype._startRecording = function(taskId) {
        $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_STOP;
        $(VALUE_NODE_ID).innerHTML = '計測中...';
        this._model.startRecording(taskId);
        var name = stateMgr.tasks[taskId].name;
        statusBox.setText('タスク "' + name + '" を開始しました', false, true);
    };

    mgm.DetailsActualDurationView.prototype._stopRecording = function(taskId) {
        $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_START;
        var duration = this._model.stopRecording(taskId);
        $(VALUE_NODE_ID).innerHTML = this.formatDuration(duration);
        var name = stateMgr.tasks[taskId].name;
        statusBox.setText('タスク "' + name + '" を終了しました', false, true);
    };

    mgm.DetailsActualDurationView.prototype._subscribeBroadcastEvent = function() {
        messageBus.subscribe(this._onActiveTaskListHover.bind(this), 'rtm.list.tasks.hoverOn');
        messageBus.subscribe(this._onActiveTaskListBlur.bind(this), 'rtm.list.tasks.hoverOff');
        messageBus.subscribe(this._onActiveListSelectionFinished.bind(this), 'rtm.list.tasks.selectFinished');
        messageBus.subscribe(this._onCompleteTaskListHover.bind(this), 'rtm.list.taskscompleted.hoverOn');
        messageBus.subscribe(this._onCompleteTaskListBlur.bind(this), 'rtm.list.taskscompleted.hoverOff');
        messageBus.subscribe(this._onCompleteListSelectionFinished.bind(this), 'rtm.list.taskscompleted.selectFinished');
    };

    function onActive(f) {
        return function() {
            $(ACTION_ICON_NODE_ID).style.display = 'inline';
            $(ACTION_NODE_ID).title = '';
            f.apply(this, arguments);
        };
    }

    function onComplete(f) {
        return function() {
            $(ACTION_ICON_NODE_ID).style.display = 'none';
            $(ACTION_NODE_ID).title = '';
            f.apply(this, arguments);
        };
    }

    function taskListHover(list, id) {
        if (this._model.isRecording(id)) {
            $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_STOP;
            $(VALUE_NODE_ID).innerHTML = '計測中...';
        } else {
            var duration = this._model.getActualDuration(id);
            $(VALUE_NODE_ID).innerHTML = this.formatDuration(duration);
        }
    }

    function taskListBlur(list) {
        this._showSelectedTaskDuration(list);
    }

    function listSelectionFinished(list) {
        this._showSelectedTaskDuration(list);
    }

    mgm.DetailsActualDurationView.prototype._onActiveTaskListHover = onActive(taskListHover);

    mgm.DetailsActualDurationView.prototype._onActiveTaskListBlur = onActive(taskListBlur);

    mgm.DetailsActualDurationView.prototype._onActiveListSelectionFinished = onActive(listSelectionFinished);

    mgm.DetailsActualDurationView.prototype._onCompleteTaskListHover = onComplete(taskListHover);

    mgm.DetailsActualDurationView.prototype._onCompleteTaskListBlur = onComplete(taskListBlur);

    mgm.DetailsActualDurationView.prototype._onCompleteListSelectionFinished = onComplete(listSelectionFinished);

    mgm.DetailsActualDurationView.prototype._showSelectedTaskDuration = function(list) {
        var ids = list.getSelected(),
            length = ids.length,
            duration = 0;
        if (length == 1 && this._model.isRecording(ids[0])) {
            $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_STOP;
            $(VALUE_NODE_ID).innerHTML = '計測中...';
        } else {
            for (var i = 0; i < length; i++) {
                if (!this._model.isRecording(ids[i])) {
                    duration += this._model.getActualDuration(ids[i]);
                }
            }
            $(VALUE_NODE_ID).innerHTML = this.formatDuration(duration);
        }
    };

    mgm.DetailsActualDurationView.prototype.formatDuration = function(duration) {
        if (duration === 0) return 'なし';
        var hour = duration / 1000 / 60 / 60;
        var minutes = (hour - Math.floor(hour)) * 60;
        return Math.floor(hour) + ' 時間 ' +  Math.floor(minutes) + ' 分';
    };

}(this, mgm));
