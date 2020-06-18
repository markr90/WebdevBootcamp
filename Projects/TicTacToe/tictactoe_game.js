var squares = document.querySelectorAll(".square");

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}

defaultState = ["", "", "",
                "", "", "",
                "", "", ""];
var rowsAndCols = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

class Game {
    constructor(player1, player2) {
        this.players = [player1, player2]
        this.state = defaultState.slice(0);
        this.playersTurn = 0;
        this.gameOver = false;
        this.turn = 0;
    }

    resetGame() {
        this.state = defaultState.slice(0);
        this.drawBoard(this.state);
        this.playersTurn = 0
        $("#infoboard").text("Current turn: (" + this.players[this.playersTurn].symbol + ") " + this.players[this.playersTurn].name);
        this.gameOver = false;
        $(".square").css("color", "black");
        this.turn = 0;
    }

    makeMove(i) {
        if (this.state[i] !== "" || this.gameOver) {
            return;
        }
        this.turn++;
        this.state[i] = this.players[this.playersTurn].symbol
        this.drawBoard(this.state);
        var winner = this.isWinner();
        var tie = (this.turn === 9);
        if (winner) {
            // display winner
            $("#infoboard").text(this.players[this.playersTurn].name + " (" + this.players[this.playersTurn].symbol + ") has won!");
        } else if (tie) {
            // display tie
            $("#infoboard").text("Game is a tie!");
        } else {
            this.playersTurn = (this.playersTurn + 1) % 2
            $("#infoboard").text("Current turn: (" + this.players[this.playersTurn].symbol + ") " + this.players[this.playersTurn].name);
        }
    }

    drawBoard(state) {
        for (var i = 0; i < squares.length; ++i) {
            squares[i].innerText = state[i];
        }
    }

    isWinner() {
        for (var i = 0; i < rowsAndCols.length; ++i) {
            if (checkIfElementsEqual(this.state, rowsAndCols[i]) && this.state[rowsAndCols[i][0]] !== "") {
                rowsAndCols[i].forEach(function(val) {
                    squares[val].style.color = "green";
                });
                return true;
            }
        }
    }
}

function checkIfElementsEqual(arr, indexArr) {
    if (Math.max(indexArr) > arr.length - 1) {
        throw "Index array out of bounds";
    }
    var selection = [];
    indexArr.forEach(function(val) {
        selection.push(arr[val]);
    });
    return selection.every( (val, i, a) => val === a[0] )
}

var game = new Game(new Player("Player1", "X"), new Player("Player2", "O"))

$("#newgame").on('click', function() {
    game.resetGame();
});

$(".square").on('click', function() {
    var indexClicked = $(".square").index(this);
    game.makeMove(indexClicked);
});
