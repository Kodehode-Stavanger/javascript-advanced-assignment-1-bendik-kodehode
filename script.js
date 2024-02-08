const playerBox = document.getElementById("player-box");
const wrapper = document.getElementById("wrapper");
const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn");

let intervals = [];
let gameOver = false;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// Dimention settings
const playAreaRatio = 4;
playerBox.style.width = "30px";
playerBox.style.height = "30px";
wrapper.style.width = "600px";
wrapper.style.height = "800px";

const wrapperHeight = wrapper.offsetHeight
const wrapperWidth = wrapper.offsetWidth

container.style.height = `${wrapperHeight / playAreaRatio}px`;
container.style.width = `${wrapperWidth}px`;
const containerHeight = container.offsetHeight;

const playerBoxHeight = playerBox.offsetHeight;
const playerBoxWidth = playerBox.offsetWidth;
playerBox.style.top = `${wrapperHeight - playerBoxHeight}px`;
playerBox.style.left = `${(wrapperWidth / 2) - (playerBoxWidth / 2)}px`;

// Speed settings
const playerBoxStep = 5;
const fallSpeed = 20;
const fallSpeedUpdateInterval = 20;
const boxSpawnRate = 200;

const moveInterval = setInterval(() => {
    movePlayer();
}, 5);

startBtn.addEventListener("click", () => {
    startBtn.style.visibility = "hidden";
    removePreviousBoxes();
    const intervalID = setInterval(() => {
        if (!(gameOver)) spawnFallingBoxes();
        else clearInterval(intervalID);
    }, boxSpawnRate)
});

container.addEventListener("click", (event) => {
    playerBox.style.top = `${event.offsetY - (playerBoxHeight / 2) + (wrapperHeight - containerHeight)}px`;
    playerBox.style.left = `${event.offsetX - (playerBoxWidth / 2)}px`;
})

window.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") moveUp = true;
    if (event.key === "s" || event.key === "ArrowDown") moveDown = true;
    if (event.key === "a" || event.key === "ArrowLeft") moveLeft = true;
    if (event.key === "d" || event.key === "ArrowRight") moveRight = true;
});

window.addEventListener("keyup", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") moveUp = false;
    if (event.key === "s" || event.key === "ArrowDown") moveDown = false;
    if (event.key === "a" || event.key === "ArrowLeft") moveLeft = false;
    if (event.key === "d" || event.key === "ArrowRight") moveRight = false;
});

function movePlayer() {
    const playerBoxTop = playerBox.offsetTop;
    const playerBoxLeft = playerBox.offsetLeft;
    const difference = wrapperHeight - containerHeight;

    if (moveUp) {
        if (playerBoxTop < difference) playerBox.style.top = `${difference}px`
        else playerBox.style.top = `${playerBoxTop - playerBoxStep}px`
    }
    if (moveDown) {
        if (playerBoxTop > (wrapperHeight - playerBoxHeight - playerBoxStep)) playerBox.style.top = `${wrapperHeight - playerBoxHeight}px`
        else playerBox.style.top = `${playerBoxTop + playerBoxStep}px`
    }
    if (moveLeft) {
        if (playerBoxLeft - playerBoxStep < 0) playerBox.style.left = "0px"
        else playerBox.style.left = `${playerBoxLeft - playerBoxStep}px`
    }
    if (moveRight) {
        if (playerBoxLeft > (wrapperWidth - playerBoxWidth - playerBoxStep)) playerBox.style.left = `${container.offsetWidth - playerBoxWidth}px`
        else playerBox.style.left = `${playerBoxLeft + playerBoxStep}px`
    }
};

function spawnFallingBoxes () {
    const fallingBox = document.createElement("div");

    fallingBox.classList.add("falling-box");
    fallingBox.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
    wrapper.append(fallingBox)
    
    fallingBox.style.top = `${0 - fallingBox.offsetHeight}px`
    fallingBox.style.left = `${Math.floor(Math.random() * (wrapper.offsetWidth - fallingBox.offsetWidth))}px`

    const intervalID = setInterval(() => {
        if (fallingBox.offsetTop < wrapper.offsetHeight) {
            fallingBox.style.top = `${fallingBox.offsetTop + fallSpeed}px`
            if (checkCollision(fallingBox)) {
                clearAllIntervals();
                gameOver = true;
                alert("Game over!");
                startBtn.style.visibility = "visible";
            }
        }
        else {
            clearInterval(intervalID);
            fallingBox.remove()
        }
    }, fallSpeedUpdateInterval); 

    intervals.push(intervalID)
}

function checkCollision (fallingBox) {
    const checkTop = () => {
        return (playerBox.offsetTop < (fallingBox.offsetTop + fallingBox.offsetHeight))
    };

    if (((playerBox.offsetLeft < (fallingBox.offsetLeft + fallingBox.offsetWidth)) && checkTop())
        && 
        (((playerBox.offsetLeft + playerBox.offsetWidth) > fallingBox.offsetLeft) && checkTop())){
        return true;
    }
    else {
        return false;
    }
};

function clearAllIntervals() {
    intervals.forEach((intervalID) => clearInterval(intervalID))
    intervals = [];
};

function removePreviousBoxes() {
    let previousBoxes = document.querySelectorAll(".falling-box");
    previousBoxes.forEach((box) => box.remove());
    previousBoxes = []
};