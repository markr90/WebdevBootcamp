var menuitems = document.querySelectorAll(".menuitem");
var squares = document.querySelectorAll(".square");
var newgamebutton = document.querySelector("#newgame");
var easybutton = document.querySelector("#easy");
var hardbutton = document.querySelector("#hard");
var headerarea = document.querySelector("#headerarea");
var colortoguess = document.querySelector("#colortoguess");
var currentselection = document.querySelector(".currentselection");
var celebration = document.querySelectorAll(".celebration");
var infotext = document.querySelector("#infotext")
var winningsquare = 1;
var winningvalues = [1,1,1];
var isHardmode = true;
var basecolor = getRGBvalues("rgb(0, 105, 171)");
var gameOver = false;
resetgame();


for (var i = 0; i < menuitems.length; i++) {
    menuitems[i].addEventListener("mouseover", function() {
        this.classList.add("onmouseover");
    })
    menuitems[i].addEventListener("mouseout", function() {
        this.classList.remove("onmouseover");
    })    
}

function rand255() {
    return Math.floor(Math.random()*256);
}

function resetgame() {
    headerarea.style.background = "";
    infotext.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.opacity = "";
    }
    celebration[0].textContent = "THE GREAT";
    celebration[1].textContent = "GUESSING GAME";
    if (isHardmode) {
        winningsquare = Math.floor(Math.random()*6) 
    } else {
        winningsquare = Math.floor(Math.random()*3) 
    }
    for (var i = 0; i < squares.length; i++) {
        var r = rand255();
        var g = rand255();
        var b = rand255();
        squares[i].style.background = "rgb(" + r + "," + g + ","+ b + ")";
        if (i === winningsquare) {
            winningvalues = [r, g, b];
            colortoguess.textContent = "RGB(" + r + ", " + g + ", " + b + ")";
        }
    }
    gameOver = false;
}

newgamebutton.addEventListener("click", function(){
    resetgame();
});

// Switch game mode

easybutton.addEventListener("click", function(){
    for (var i = 3; i < squares.length; i++) {
        squares[i].classList.add("d-none");
    }
    easybutton.classList.add("currentselection");
    hardbutton.classList.remove("currentselection");
    if (isHardmode) {
        isHardmode = false;
        resetgame();
    }
    currentselection = easybutton;
});

hardbutton.addEventListener("click", function(){
    for (var i = 3; i < squares.length; i++) {
        squares[i].classList.remove("d-none");
    }
    hardbutton.classList.add("currentselection");
    easybutton.classList.remove("currentselection");
    easybutton.classList.remove("currentselection");
    if (!isHardmode) {
        isHardmode = true;
        resetgame();
    }
    currentselection = hardbutton;
});

// Check if right square guessed

for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function(){
        if (arrayEquals(getRGBvalues(this.style.background), winningvalues)) {
            headerarea.style.background = arrToRGB(winningvalues);
            for (var i = 0; i < celebration.length; i++) {
                celebration[i].textContent = "CONGRATULATIONS!";
            }
            for (var i = 0; i < squares.length; i++) {
                squares[i].style.background = arrToRGB(winningvalues);
                squares[i].style.opacity = 1;
            }
            gameOver = true;
            infotext.textContent = "Correct!";
        } else {
            this.style.opacity = 0;
            infotext.textContent = "Try Again";
        }
    });
}

function getRGBvalues(rgbstring) {
    var rgb = rgbstring.replace(/[^\d,]/g, '').split(',');
    for (var i = 0; i < rgb.length; i++) {
        rgb[i] = parseInt(rgb[i]);
    }
    return rgb;
}

function arrayEquals(a, b) {
    if (a.length !== b.length) {
        return false;
    } else {
        var res = false;
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return res;
            }
        }
        var res = true;
        return res;
    }
}

function arrToRGB(a) {
    return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")";
}