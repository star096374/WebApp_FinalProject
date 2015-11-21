'use strict';

(function(exports) {

    var ConnectFour = function() {
        this.boardStatus = []; //用來記錄當前棋盤狀態
        this.counter = 0; //紀錄已經下了幾顆棋
    };

    ConnectFour.prototype = {
        init() {
            //初始化棋盤狀態
            for(var i = 0; i < 6; i++) {
                this.boardStatus[i] = [];
                for(var j = 0; j < 7; j++) {
                    this.boardStatus[i][j] = -1;
                }
            }
            //將每個按鈕的EventListener加上去
            for(var i = 0; i < 7; i++) {
                var targetId = 'col' + i;
                this.setButtonClicked(targetId, i);
            }
            document.getElementById('reset').addEventListener('click', (function(event) {
                this.reset();
            }).bind(this));
        },

        setButtonClicked(targetId, col) {
            //targetId是指要設置的按鈕的ID
            //col紀錄目前處理的按鈕的column為何
            var button = document.getElementById(targetId);
            button.addEventListener('click', (function(event) {
                //檢查該放到哪一格，並做對應的修改動作
                for(var i = 5; i >= 0; i--) {
                    if(this.boardStatus[i][col] != -1) {
                        continue;
                    }
                    else {
                        //counter同時可以用來計算是哪一個玩家下的棋
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
                        //如果該column沒有空位了，則將按鈕disable掉
                        if(i == 0) {
                            button.disabled = true;
                        }
                        //下完這步棋之後，檢查是否有玩家勝利或者平手
                        this.checkWin(i, col, this.counter % 2);
                        this.counter += 1;
                        break;
                    }
                }
            }).bind(this));
        },

        checkWin(row, col, player) {
            //檢查直的是否有連成一線
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
            //檢查橫的是否有連成一線
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
            //檢查左上到右下是否有連成一線
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
            //檢查右上到左下是否連成一線
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
            //如果已經下到了最後一部仍然沒有人勝利，則宣佈平手
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

        //宣告勝利者用的函式，並將按鈕都disable掉
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
