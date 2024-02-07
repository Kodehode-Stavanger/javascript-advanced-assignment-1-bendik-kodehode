const playerBox = document.getElementById("box");
const wrapper = document.getElementById("wrapper");
const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn");
let intervals = [];

// Adjustable dimensions
playerBox.style.width = "30px";
playerBox.style.height = "30px";
wrapper.style.width = "500px";
wrapper.style.height = "800px";

const wrapperHeight = wrapper.offsetHeight
const wrapperWidth = wrapper.offsetWidth

container.style.height = `${wrapperHeight / 4}px`;
container.style.width = `${wrapperWidth}px`;
const containerHeight = container.offsetHeight;

const playerBoxHeight = playerBox.offsetHeight;
const playerBoxWidth = playerBox.offsetWidth;
playerBox.style.top = `${containerHeight - playerBoxHeight}px`;
playerBox.style.left = `${(wrapperWidth / 2) - (playerBoxWidth / 2)}px`;

const moveSpeed = 20;
const fallSpeed = 5;
const fallSpeedInterval = 20;
const boxSpawnInterval = 5;

startBtn.addEventListener("click", () => {
    startBtn.style.visibility = "hidden";
    removePreviousBoxes();
    spawnFallingBoxes();
})

window.addEventListener("keypress", (event) => {
    const playerBoxTop = playerBox.offsetTop;
    const playerBoxLeft = playerBox.offsetLeft;

    if (event.key === "w" || event.key === "ArrowUp") {
        if (playerBoxTop < (0 + playerBoxHeight)) playerBox.style.top = "0px"
        else playerBox.style.top = `${playerBoxTop - moveSpeed}px`
    }
    else if (event.key === "s" || event.key === "ArrowDown") {
        if (playerBoxTop > (containerHeight - playerBoxHeight - moveSpeed)) playerBox.style.top = `${containerHeight - playerBoxHeight}px`
        else playerBox.style.top = `${playerBoxTop + moveSpeed}px`
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
        if (playerBoxLeft < (0 + playerBoxWidth)) playerBox.style.left = "0px"
        else playerBox.style.left = `${playerBoxLeft - moveSpeed}px`
    }
    else if (event.key === "d" || event.key === "ArrowRight") {
        if (playerBoxLeft >= (wrapperWidth - playerBoxWidth - moveSpeed)) playerBox.style.left = `${container.offsetWidth - playerBoxWidth}px`
        else playerBox.style.left = `${playerBoxLeft + moveSpeed}px`
    }
})

container.addEventListener("click", (event) => {
    playerBox.style.top = `${event.offsetY - (playerBoxHeight / 2)}px`;
    playerBox.style.left = `${event.offsetX - (playerBoxWidth / 2)}px`;
})

function spawnFallingBoxes () {
    const fallingBox = document.createElement("div");

    fallingBox.classList.add("falling-box");
    fallingBox.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
    wrapper.append(fallingBox)
    
    fallingBox.style.top = `${0 - fallingBox.offsetHeight}px`
    fallingBox.style.left = `${Math.floor(Math.random() * (wrapper.offsetWidth - fallingBox.offsetWidth))}px`

    const interval = setInterval(() => {
        if (fallingBox.offsetTop < wrapper.offsetHeight) {
            fallingBox.style.top = `${fallingBox.offsetTop + fallSpeed}px`
            if (checkCollision(fallingBox)) {
                clearAllIntervals();
                alert("Game over!");
                startBtn.style.visibility = "visible";
            }
        }
        else {
            clearInterval(interval);
            fallingBox.remove()
        }
    }, fallSpeedInterval); 

    intervals.push(interval)
}

function checkCollision (fallingBox) {
    const checkTop = () => {
        return (playerBox.offsetTop < (fallingBox.offsetTop + fallingBox.offsetHeight))
    }

    if (((playerBox.offsetLeft < (fallingBox.offsetLeft + fallingBox.offsetWidth)) && checkTop())
        && 
        (((playerBox.offsetLeft + playerBox.offsetWidth) > fallingBox.offsetLeft) && checkTop())){
        return true;
    }
    else {
        return false;
    }
}

function clearAllIntervals() {
    intervals.forEach((interval) => clearInterval(interval))
    intervals = [];
}

function removePreviousBoxes() {
    let previousBoxes = document.querySelectorAll(".falling-box");
    previousBoxes.forEach((box) => box.remove());
    previousBoxes = []
}