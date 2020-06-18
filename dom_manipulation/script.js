// 4 different selectors for first paragraph
var p1 = document.querySelector("p");
var p2 = document.getElementById("first");
var p3 = document.getElementsByClassName("special")[0];
var p4 = document.getElementsByTagName("p")[0];

p4.style.color = "red";

var tag = document.getElementById("toHighlight");
//manipulate the style of a tag with .style
tag.style.color = "pink";

// better to define a class in separate css file and then add the class (or remove / toggle)
tag.classList.add("highlight");

// text content removes any nested tags!!
var st = document.querySelector("strong");
st.textContent = "REPLACED";
// use innerHTML to keep nested tags
st.innerHTML = "strong <em>emph</em> strong"

var score1 = 0;
var score2 = 0;
var p1scoretally = document.querySelector("#p1score");
var p2scoretally = document.querySelector("#p2score")

function changescore(s1, s2) {
    p1scoretally.textContent = s1;
    p2scoretally.textContent = s2;
    if (s1 > 4) {
        p1scoretally.classList.add("greentext");
    } else {
        p1scoretally.classList.remove("greentext");
    }
    if (s2 > 4) {
        p2scoretally.classList.add("greentext");
    } else {
        p2scoretally.classList.remove("greentext");
    }
};

function resetscore() {
    changescore(0, 0);
    score1 = 0;
    score2 = 0;
}

document.querySelector("#pl1").addEventListener("click", function() {
    if (score1 < 5 && score2 < 5) {
        score1++;
    }
    changescore(score1, score2);
});

document.querySelector("#pl2").addEventListener("click", function() {
    if (score1 < 5 && score2 < 5) {
        score2++;
    }
    changescore(score1, score2);
});

document.querySelector("#reset").addEventListener("click", resetscore);


var lis = document.querySelectorAll("li");

for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseover", function() {
        this.classList.add("hoverover");
    })
    lis[i].addEventListener("mouseout", function() {
        this.classList.remove("hoverover");
    })
    lis[i].addEventListener("click", function() {
        this.classList.toggle("done");
    })
}