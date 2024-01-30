const getWord = async () => {
    const response = await fetch("https://api.masoudkf.com/v1/wordle", {
        headers: {
            "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
        },
    });
    const { dictionary } = await response.json();
        dict = dictionary;
        const { word, hint } = dictionary[Math.floor(Math.random() * dictionary.length)];
        console.log(word, hint);
        userWord = word.toUpperCase();
        userHint = hint;
}

getWord();


var height = 4;
var width = 4;

var row = 0;
var col = 0;

var gameOver = false;


window.onload = function() {
    initialize();
}


function initialize() {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let tile = document.createElement("span");
            // assigning ids to each tile
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            // blank tile
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currentTile.innerText == "") {
                    currentTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }

        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
            }
            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
            currentTile.innerText = "";
        }         

        else if (e.code == "Enter") {
            if (0 < col && col < width) {
                window.alert("You must complete the word first");
            }
            else {
                nextRow();
                row += 1;
                col = 0;
            }
        }

        if (!gameOver && row == height) {
            gameOver = true;
            gameLost();
        }

    })
}

function nextRow() {
    let correct = 0;
    for (let j = 0; j < width; j++) {
        let currentTile = document.getElementById(row.toString() + "-" + j.toString());
        let letter = currentTile.innerText;

        // correct position?
        if (userWord[j] == letter) {
            currentTile.classList.add("correct");
            correct += 1;
        }

        // in the word?
        else if (userWord.includes(letter)) {
            currentTile.classList.add("present");
        }
        
        // not in the word
        else {
            currentTile.classList.add("absent")
        }

        if (correct == width) {
            gameOver = true;
            gameWon();
        }
    }
}


function toggleDarkMode() {
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
}

function toggleHint() {
    var hintDiv = document.createElement("div");
    hintDiv.classList.add("hint");
    hintDiv.innerText = "Hint: " + userHint;
    document.body.appendChild(hintDiv);
}

function toggleInstructions() {
    var containerDiv = document.getElementById("right-column");
    console.log(containerDiv.classList);
    containerDiv.classList.toggle("invisible");
}

function gameLost() {
    var losingMessage = document.createElement("div");
    losingMessage.classList.add("lost");
    losingMessage.innerText = "You missed the word " + userWord + " and lost!";
    document.body.appendChild(losingMessage);
}

function gameWon() {
    var oldDiv = document.getElementById("board");
    var newDiv = document.createElement("div");
    newDiv.classList.add("image");
    var congratsImage = document.createElement("img");
    congratsImage.src = "congratsImg.gif";
    newDiv.appendChild(congratsImage);
    oldDiv.parentNode.replaceChild(newDiv, oldDiv);

    var winningMessage = document.createElement("div");
    winningMessage.classList.add("won");
    winningMessage.innerText = "You guessed the word " + userWord + " correctly!";
    document.body.appendChild(winningMessage);
}

function refreshPage() {
    location.reload();
}