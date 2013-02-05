(function(global, mgm) {

    var $ = function() {return document.getElementById(arguments[0]);};

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
            none = '0 時間 0 分',
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
        if (confirm('タスク計測を開始しますか？')) {
            $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_STOP;
            $(VALUE_NODE_ID).innerHTML = '計測中...';
            this._model.startRecording(taskId);
        }
    };

    mgm.DetailsActualDurationView.prototype._stopRecording = function(taskId) {
        if (confirm('タスク計測を終了しますか？')) {
            $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_START;
            this._model.stopRecording(taskId);
        }
    };

    mgm.DetailsActualDurationView.prototype._subscribeBroadcastEvent = function() {
        messageBus.subscribe(this._onTaskListHover.bind(this), 'rtm.list.tasks.hoverOn');
        messageBus.subscribe(this._onTaskListBlur.bind(this), 'rtm.list.tasks.hoverOff');
        messageBus.subscribe(this._onListSelectionFinished.bind(this), 'rtm.list.tasks.selectFinished');
    };

    mgm.DetailsActualDurationView.prototype._onListSelectionFinished = function(list) {
        this._showSelectedTaskDuration(list);
    };

    mgm.DetailsActualDurationView.prototype._onTaskListHover = function(list, id) {
        if (this._model.isRecording(id)) {
            $(ACTION_ICON_NODE_ID).src = 'data:image/png;base64,' + ICON_STOP;
            $(VALUE_NODE_ID).innerHTML = '計測中...';
        } else {
            var duration = this._model.getActualDuration(id);
            $(VALUE_NODE_ID).innerHTML = this.formatDuration(duration);
        }
    };

    mgm.DetailsActualDurationView.prototype._onTaskListBlur = function(list) {
        this._showSelectedTaskDuration(list);
    };

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
        var hour = duration / 1000 / 60 / 60;
        var minutes = (hour - Math.floor(hour)) * 60;
        return Math.floor(hour) + ' 時間 ' +  Math.floor(minutes) + ' 分';
    };

}(this, mgm));
