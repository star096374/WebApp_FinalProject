'use strict';

(function(exports) {

    var ConnectFour = function() {
        this.boardStatus = []; //用來記錄當前棋盤狀態
        this.counter = 0; //紀錄已經下了幾顆棋
    };

    ConnectFour.prototype = {
        init() {
            //初始化棋盤狀態
            this.resetBoardStatus();
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

        //檢查是否已經有勝利者產生
        checkWin(row, col, player) {
            //flag用來記錄目前狀況，true代表已經有勝利者產生，否則為false
            var flag = false;
            if(this.checkVertical(row, col, player) == true) {
                flag = true;
            }
            else if (this.checkHorizontal(row, col, player) == true) {
                flag = true;
            }
            else if (this.checkLeftupToRightdown(row, col, player) == true) {
                flag = true;
            }
            else if (this.checkLeftdownToRightup(row, col, player) == true) {
                flag = true;
            }
            //若已經有勝利者產生，則呼叫winner函式宣告勝利者
            if (flag == true) {
                this.winner(player);
            }
            //若沒有勝利者產生，但已經下到最後一步棋，則宣告平手
            else if (this.checkDraw() == true) {
                exports.alert('Draw!');
            }
        },

        //檢查垂直方向是否已經連成一線
        checkVertical(row, col, player) {
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
                return true;
            }
            else {
                return false;
            }
        },

        //檢查水平方向是否已經連成一線
        checkHorizontal(row, col, player) {
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
                return true;
            }
            else {
                return false;
            }
        },

        //檢查左上到右下是否已經連成一線
        checkLeftupToRightdown(row, col, player) {
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
                return true;
            }
            else {
                return false;
            }
        },

        //檢查左下到右上是否已經連成一線
        checkLeftdownToRightup(row, col, player) {
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
                return true;
            }
            else {
                return false;
            }
        },

        //檢查是否平手
        checkDraw() {
            if(this.counter == 41) {
                return true;
            }
            else {
                return false;
            }
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
        },

        //重置遊戲狀況的函式
        reset() {
            this.resetCounter();
            this.resetBoardStatus();
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

        //清空棋盤狀態
        resetBoardStatus() {
            for(var i = 0; i < 6; i++) {
                this.boardStatus[i] = [];
                for(var j = 0; j < 7; j++) {
                    this.boardStatus[i][j] = -1;
                }
            }
        },

        //將counter歸零
        resetCounter() {
            this.counter = 0;
        }
    };

    exports.ConnectFour = ConnectFour;
})(window);
