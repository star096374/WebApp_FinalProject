'use strict';

(function(exports) {

    var ConnectFour = function() {
        this.boardStatus = [];
        this.counter = 0;
    };

    ConnectFour.prototype = {
        init() {
            for(var i = 0; i < 6; i++) {
                this.boardStatus[i] = [];
                for(var j = 0; j < 7; j++) {
                    this.boardStatus[i][j] = -1;
                }
            }
            for(var i = 0; i < 7; i++) {
                var targetId = 'col' + i;
                this.setButtonClicked(targetId, i);
            }
            document.getElementById('reset').addEventListener('click', (function(event) {
                this.reset();
            }).bind(this));
        },

        setButtonClicked(targetId, col) {
            var button = document.getElementById(targetId);
            button.addEventListener('click', (function(event) {
                for(var i = 5; i >= 0; i--) {
                    if(this.boardStatus[i][col] != -1) {
                        continue;
                    }
                    else {
                        this.boardStatus[i][col] = this.counter % 2;
                        var s = i + '-' + col;
                        var td = document.getElementById(s);
                        var status = document.getElementById('status');
                        if(this.counter % 2 == 0) {
                            td.innerHTML = '<img src="images/red.png">';
                            status.innerHTML = 'Player:Yellow';
                            status.style.color = 'yellow';
                        }
                        else {
                            td.innerHTML = '<img src="images/yellow.png">'
                            status.innerHTML = 'Player:Red';
                            status.style.color = 'red';
                        }
                        if(i == 0) {
                            button.disabled = true;
                        }
                        this.checkWin(i, col, this.counter % 2);
                        this.counter += 1;
                        break;
                    }
                }
            }).bind(this));
        },

        checkWin(row, col, player) {
            //check vertical
            var down = 0;
            for(var i = row; i <= 5; i++) {
                if(this.boardStatus[i][col] == player) {
                    down += 1;
                }
                else {
                    break;
                }
            }
            if(down == 4) {
                this.winner(player);
            }
            //check horizontal
            var left = 0;
            var right = 0;
            for(var i = col+1; i <= 6; i++) {
                if(this.boardStatus[row][i] == player) {
                    right += 1;
                }
                else {
                    break;
                }
            }
            for(var i = col-1; i >= 0; i--) {
                if(this.boardStatus[row][i] == player) {
                    left += 1;
                }
                else {
                    break;
                }
            }
            if(left >= 3 || right >= 3 || (left+right) >= 3) {
                this.winner(player);
            }
            //check leftup and rightdown
            var leftup = 0;
            var rightdown = 0;
            for(var i = 1; i <= 6; i++) {
                if((row-i >= 0) && (col-i >= 0) && (this.boardStatus[row-i][col-i] == player)) {
                    leftup += 1;
                }
                else {
                    break;
                }
            }
            for(var i = 1; i <= 6; i++) {
                if((row+i <= 5) && (col+i <= 6) && (this.boardStatus[row+i][col+i] == player)) {
                    rightdown += 1;
                }
                else {
                    break;
                }
            }
            if(leftup >= 3 || rightdown >= 3 || (leftup+rightdown) >= 3) {
                this.winner(player);
            }
            //check leftdown and rightup
            var leftdown = 0;
            var rightup = 0;
            for(var i = 1; i <= 6; i++) {
                if((row+i <= 5) && (col-i >= 0) && (this.boardStatus[row+i][col-i] == player)) {
                    leftdown += 1;
                }
                else {
                    break;
                }
            }
            for(var i = 1; i <= 6; i++) {
                if((row-i >= 0) && (col+i <= 6) && (this.boardStatus[row-i][col+i] == player)) {
                    rightup += 1;
                }
                else {
                    break;
                }
            }
            if(leftdown >= 3 || rightup >= 3 || (leftdown+rightup) >= 3) {
                this.winner(player);
            }
            //draw
            if(this.counter == 41) {
                exports.alert('Draw!');
            }
        },

        reset() {
            this.counter = 0;
            for(var i = 0; i < 6; i++) {
                this.boardStatus[i] = [];
                for(var j = 0; j < 7; j++) {
                    this.boardStatus[i][j] = -1;
                }
            }
            var td = document.getElementsByTagName('td');
            for(var i = 0; i < 42; i++) {
                td[i].innerHTML = '';
            }
            for(var i = 0; i < 7; i++) {
                var s = 'col' + i;
                document.getElementById(s).disabled = false;
            }
            document.getElementById('status').innerHTML = "Player:Red";
            document.getElementById('status').style.color = 'red';
        },

        winner(player) {
            for(var i = 0; i < 7; i++) {
                var s = 'col' + i;
                document.getElementById(s).disabled = true;
            }
            if(player == 0) {
                exports.alert('Red Win!');
            }
            else {
                exports.alert('Yellow Win!');
            }
        }
    };

    exports.ConnectFour = ConnectFour;
})(window);
