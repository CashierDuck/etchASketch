const grid = document.querySelector('.grid');
const sizeSlider = document.getElementById("sizeSlider");
const gridSizeLabel = document.getElementById("gridSize");
const colorPicker = document.getElementById("colorPicker");

let currentColor = "#000000";
let isDrawing = false;
let isRainbowMode = false;
let backgroundColor = "white";

function createGrid(size){
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    grid.style.setProperty("--cell-size", `${100/size}%`);

    for(let i = 0; i < size * size; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.backgroundColor = "white";
        grid.appendChild(cell);
        addDraw(cell);
    }
}

function addDraw(cell){
    cell.addEventListener("mousedown", () => {
        isDrawing = true;
        if(isRainbowMode) {
            currentColor = getRandomColor();
        }
        cell.style.backgroundColor = currentColor;
    });

    cell.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    cell.addEventListener("mousemove", () => {
        if(isDrawing && isRainbowMode) {
            cell.style.backgroundColor = currentColor;
        }
    });

    cell.addEventListener("mouseleave", () => {
        if(isDrawing) {
            if(isRainbowMode) {
                currentColor = getRandomColor();
            }
            cell.style.backgroundColor = currentColor;
        }
    });
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for(let i = 0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function updateGridSize() {
    const size = sizeSlider.value;
    gridSizeLabel.textContent = size;
    createGrid(size);
    gridlines();
}
createGrid(sizeSlider.value);
sizeSlider.addEventListener("input", updateGridSize);

const penButton = document.querySelector("#pen");
function pen(){
    isRainbowMode = false;
    currentColor = colorPicker.value;
}
penButton.addEventListener("click", pen);

const eraseButton = document.querySelector("#erase");
function erase(){
    isRainbowMode = false;
    currentColor = backgroundColor;
}
eraseButton.addEventListener("click", erase);

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", () => {
    isRainbowMode = true;
});

const backgroundButton = document.querySelector("#background");
function background(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
       cell.style.backgroundColor = colorPicker.value; 
    });

    backgroundColor = colorPicker.value;
}
backgroundButton.addEventListener("click", background);

const gridlinesButton = document.querySelector("#gridlines");
function gridlines(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
       cell.classList.toggle("gridline");
    });

    backgroundColor = colorPicker.value;
}
gridlinesButton.addEventListener("click", gridlines);

const clearButton = document.querySelector("#clear");
function clear(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
       cell.style.backgroundColor = "white";
    });

    backgroundColor = "white";
    colorPicker.value = "black";

    penButton.click();
}
clearButton.addEventListener("click", clear);

const buttons = document.querySelectorAll(".menuLeft > button");

function activateButton(buttonToActivate){
    buttons.forEach(btn => btn.classList.remove("active"));

    buttonToActivate.classList.add("active")
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        activateButton(button);
    });
});

colorPicker.addEventListener("input", (event) => {
    currentColor = event.target.value;
});

gridlines();