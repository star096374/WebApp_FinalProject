describe('Test Game', function() {
    var subject;
    beforeEach(function() {
        subject = new ConnectFour();
    });

    it('Test resetBoardStatus function', function() {
        for(var i = 0; i < 6; i++) {
            subject.boardStatus[i] = [];
            for(var j = 0; j < 7; j++) {
                subject.boardStatus[i][j] = -1;
            }
        }
        subject.boardStatus[2][4] = 0;
        subject.boardStatus[3][3] = 1;
        subject.resetBoardStatus();
        var clearBoardStatus = true;
        for(var i = 0; i < 6; i++) {
            for(var j = 0; j < 7; j++) {
                if(subject.boardStatus[i][j] != -1) {
                    clearBoardStatus = false;
                }
            }
        }
        assert.equal(clearBoardStatus, true, 'You did not clean boardStatus.');
    });

    it('Test resetCounter function', function() {
        subject.counter == 10;
        subject.resetCounter();
        assert.equal(subject.counter, 0, 'Counter is not zero.');
    });

    it('Test checkVertical function', function() {
        subject.resetBoardStatus();
        subject.boardStatus[5][0] = 1;
        subject.boardStatus[4][0] = 1;
        subject.boardStatus[3][0] = 1;
        subject.boardStatus[2][0] = 1;
        assert.equal(subject.checkVertical(2, 0, 1), true, 'The flag should be true.');
        subject.resetBoardStatus();
        subject.boardStatus[5][0] = 1;
        subject.boardStatus[4][0] = 0;
        subject.boardStatus[3][0] = 1;
        subject.boardStatus[2][0] = 0;
        assert.equal(subject.checkVertical(2, 0, 0), false, 'The flag should be false.');
    });

    it('Test checkHorizontal function', function() {
        subject.resetBoardStatus();
        subject.boardStatus[5][0] = 1;
        subject.boardStatus[5][1] = 1;
        subject.boardStatus[5][2] = 1;
        subject.boardStatus[5][3] = 1;
        assert.equal(subject.checkHorizontal(5, 3, 1), true, 'The flag should be true.');
        subject.resetBoardStatus();
        subject.boardStatus[5][0] = 1;
        subject.boardStatus[5][1] = 0;
        subject.boardStatus[5][2] = 1;
        subject.boardStatus[5][3] = 0;
        assert.equal(subject.checkHorizontal(5, 3, 0), false, 'The flag should be false.');
    });

    it('Test checkLeftupToRightdown function', function() {
        subject.resetBoardStatus();
        subject.boardStatus[1][0] = 1;
        subject.boardStatus[2][1] = 1;
        subject.boardStatus[3][2] = 1;
        subject.boardStatus[4][3] = 1;
        assert.equal(subject.checkLeftupToRightdown(4, 3, 1), true, 'The flag should be true.');
        subject.resetBoardStatus();
        subject.boardStatus[1][0] = 1;
        subject.boardStatus[2][1] = 0;
        subject.boardStatus[3][2] = 1;
        subject.boardStatus[4][3] = 0;
        assert.equal(subject.checkLeftupToRightdown(4, 3, 0), false, 'The flag should be false.');
    });

    it('Test checkLeftdownToRightup function', function() {
        subject.resetBoardStatus();
        subject.boardStatus[5][0] = 1;
        subject.boardStatus[4][1] = 1;
        subject.boardStatus[3][2] = 1;
        subject.boardStatus[2][3] = 1;
        assert.equal(subject.checkLeftdownToRightup(2, 3, 1), true, 'The flag should be true.');
        subject.resetBoardStatus();
        subject.boardStatus[5][0] = 1;
        subject.boardStatus[4][1] = 0;
        subject.boardStatus[3][2] = 1;
        subject.boardStatus[2][3] = 0;
        assert.equal(subject.checkLeftdownToRightup(2, 3, 0), false, 'The flag should be false.');
    });

    it('Test checkDraw function', function() {
        subject.resetCounter();
        subject.counter = 40;
        assert.equal(subject.checkDraw(), false, 'The flag should be false.');
        subject.counter++;
        assert.equal(subject.checkDraw(), true, 'The flag should be true.');
    });
});
