const grid = document.getElementById("grid");
let gridSize = 500;
let squaresPerRow = 16;
let squares;

let randomColorsEnabled = false;
let alphaEnabled = false;

const randomColorButton = document.getElementById("random-color");
const randomColorDisplay = document.getElementById("random-color-display")

const alphaButton = document.getElementById("alpha");
const alphaDisplay = document.getElementById("alpha-display");

alphaButton.addEventListener("click", toggleAlpha);
randomColorButton.addEventListener("click", toggleRandomColors);

function toggleRandomColors() {
    randomColorsEnabled = !randomColorsEnabled;

    if (randomColorsEnabled) {
        randomColorDisplay.textContent = "On";
    }
    else {
        randomColorDisplay.textContent = "Off"
    }
}

function toggleAlpha() {
    alphaEnabled = !alphaEnabled;
    if (alphaEnabled) {
        alphaDisplay.textContent = "On"
    } else {
        alphaDisplay.textContent = "Off"
    }
}

grid.style.cssText = `
    height: ${gridSize}px;
    width: ${gridSize}px;
`;

const resetButton = document.getElementById("reset");

const colorPicker = document.getElementById("color-picker");
let color = "rgb(0,0,0)";
colorPicker.addEventListener("change", changeColor);

function changeColor(e) {
    color = e.target.value;
}

function clearGrid() {
    grid.innerHTML = "";
}

resetButton.addEventListener("click", () => {

    squaresPerRow = window.prompt("Enter how many squares per row you want: ", "16");
    console.log(isNaN(parseInt(squaresPerRow)))

    if (squaresPerRow <= 0 || squaresPerRow >= 65 || isNaN(parseInt(squaresPerRow))) {
        while (squaresPerRow <= 0 || squaresPerRow >= 65 || isNaN(parseInt(squaresPerRow))) {
            squaresPerRow = prompt("Error - Input outside allowed range (1-64). Enter how many squares per row you want: ", "16");
        }
    }

    clearGrid();
    generateAllSquares(gridSize, squaresPerRow);

})

function generateOneSquare(gridSize, squaresPerRow) {

    const square = document.createElement("div");
    const squareSize = gridSize/squaresPerRow;
    square.classList.add("square");

    let borderSize = 1;

    if (squaresPerRow <= 3) {
        borderSize = 5;
    } else if (squaresPerRow <= 12) {
        borderSize = 3;
    } else if (squaresPerRow <= 20) {
        borderSize = 2;
    }

    square.style.cssText = `
        border-right: ${borderSize}px solid #999;
        border-bottom: ${borderSize}px solid #999;
        height: ${squareSize}px;
        width: ${squareSize}px;
        display: inline-block;
        vertical-align: top;
        border-radius: ${squareSize/10}px;
        background-color: rgb(255,255,255);
    `
    return square;
}

function hoverHandler(e) {
    if (e.buttons < 1) return;
    colorSquare(e);
}

function colorSquare(e) {

    if (randomColorsEnabled) {
        const rValue = Math.floor(Math.random()*255);
        const gValue = Math.floor(Math.random()*255);
        const bValue = Math.floor(Math.random()*255);
        e.target.style.backgroundColor = `rgb(${rValue},${gValue},${bValue})`;
    } else {
        e.target.style.backgroundColor = color;
    } 

    console.log(e.target.style);

    if (alphaEnabled) {
        const originalOpacity = e.target.style.opacity || 1;
        console.log(originalOpacity);
        e.target.style.opacity = originalOpacity - .1;
        console.log(e.target.style.opacity);
    } else {
        e.target.style.opacity = 1;
    }

}

function clickHandler(e) {
    colorSquare(e);
}

function generateAllSquares(gridSize, squaresPerRow) {

    for (let i = 0; i < squaresPerRow; i++) {

        const row = document.createElement("div");
        const rowHeight = gridSize/squaresPerRow;

        row.style.cssText = `
            display: inline-block;
            float: left;
            height: ${rowHeight}px;
        `

        for (let j = 0; j < squaresPerRow; j++) {
            row.appendChild(generateOneSquare(gridSize, squaresPerRow));
        }

        grid.appendChild(row);
    }

    squares = Array.from(document.getElementsByClassName("square"));

    squares.forEach(element => {
        element.addEventListener("mouseover", hoverHandler);
        element.addEventListener("mousedown", (e) => e.preventDefault())
        element.addEventListener("mousedown", e => colorSquare(e));
        element.addEventListener("contextmenu", (e) => e.preventDefault())
    });

}

generateAllSquares(gridSize, squaresPerRow);