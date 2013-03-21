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

/* jshint expr:true */

describe('DetailsActualDurationModel について', function() {

    var model;

    describe('タスクが計測中の場合', function() {

        before(function() {
            var noteMgr = {
                index: {
                    10: [100],
                    11: [101, 102]
                }
            };
            var stateMgr = {
                tasks: {
                    1: { series_id: 10 },
                    2: { series_id: 11 }
                },
                notes: {
                    100: {
                        title: 'Measuring Glass',
                        content: '2013-03-21T14:27:53.565Z,'
                    },
                    101: {
                        title: 'Test',
                        content: 'Test Content'
                    },
                    102: {
                        title: 'Measuring Glass',
                        content: '2013-03-22T14:27:53.565Z,'
                    }
                }
            };
            var transMgr = {};
            model = new mgm.DetailsActualDurationModel(noteMgr, stateMgr, transMgr);
        });

        it('isRecording は true を返却します', function() {
            model.isRecording(1).should.equal(true);
        });

        it('getStartTime は開始時刻を返却します', function() {
            model.getStartTime(1).should.equal(new Date('2013-03-21T14:27:53.565Z').getTime());
        });

        it('startRecording しても開始時刻は変わりません', function() {
            model.startRecording(1);
            model.getStartTime(1).should.equal(new Date('2013-03-21T14:27:53.565Z').getTime());
        });
    });

});
