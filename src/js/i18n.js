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

    if (!configurationMgr) {
        global.setTimeout(arguments.callee.bind(global, global, mgm, initialize), 500);
    } else {
        initialize(mgm);
    }

}(this, mgm, function(mgm) {

    var lang = {};

    lang.ja = {
        TITLE: '時間を計測する (m)',
        LABEL: '計測時間',
        HOUR: '時間',
        MIN: '分',
        NONE: 'なし',
        TEMPLATE_START_TASK: 'タスク "{{name}}" を開始しました',
        TEMPLATE_STOP_TASK: 'タスク "{{name}}" を終了しました',
        TEMPLATE_RECORDING: '計測中... ({{duration}}経過)'
    };

    lang.en_US = {
        TITLE: 'Record Time Duration (m)',
        LABEL: 'Time recorded',
        HOUR: 'h ',
        MIN: 'min',
        NONE: 'none',
        TEMPLATE_START_TASK: 'Task "{{name}}" has started.',
        TEMPLATE_STOP_TASK: 'Task "{{name}}" has stoped.',
        TEMPLATE_RECORDING: 'Rec... ({{duration}})'
    };

    var selected = configurationMgr.language.selectedOptions[0].getAttribute('value');

    mgm.i18n = lang[selected] || lang.en_US;

}));
