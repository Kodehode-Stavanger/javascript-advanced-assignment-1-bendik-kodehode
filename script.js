const box = document.getElementById("box");
const wrapper = document.getElementById("wrapper");
const container = document.getElementById("container");
const startBtn = document.getElementById("start-btn")

// Adjustable dimensions
box.style.width = "30px";
box.style.height = "30px";
wrapper.style.width = "500px";
wrapper.style.height = "800px";

const boxHeight = parseInt(box.style.height)
const boxWidth = parseInt(box.style.width)
const wrapperHeight = wrapper.offsetHeight
const wrapperWidth = wrapper.offsetWidth

container.style.height = `${wrapperHeight / 4}px`;
container.style.width = `${wrapperWidth}px`;
const containerHeight = parseInt(container.style.height);
const containerWidth = parseInt(container.style.width);

box.style.top = `${containerHeight - boxHeight}px`;
box.style.left = `${(wrapperWidth / 2) - (boxWidth / 2)}px`;

const moveSpeed = 20;
const fallSpeed = 5;
const fallSpeedInterval = 20;

startBtn.addEventListener("click", () => {
    // startBtn.style.visibility = "hidden";
    spawnFallingBoxes();
})

window.addEventListener("keypress", (event) => {
    const boxTop = parseInt(box.style.top);
    const boxLeft = parseInt(box.style.left)

    if (event.key === "w" || event.key === "ArrowUp") {
        if (boxTop < (0 + boxHeight)) box.style.top = "0px"
        else box.style.top = `${boxTop - moveSpeed}px`
    }
    else if (event.key === "s" || event.key === "ArrowDown") {
        if (boxTop > (containerHeight - boxHeight - moveSpeed)) box.style.top = `${containerHeight - boxHeight}px`
        else box.style.top = `${boxTop + moveSpeed}px`
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
        if (boxLeft < (0 + boxWidth)) box.style.left = "0px"
        else box.style.left = `${boxLeft - moveSpeed}px`
    }
    else if (event.key === "d" || event.key === "ArrowRight") {
        if (boxLeft >= (wrapperWidth - boxWidth - moveSpeed)) box.style.left = `${containerWidth - boxWidth}px`
        else box.style.left = `${boxLeft + moveSpeed}px`
    }
})

container.addEventListener("click", (event) => {
    box.style.top = `${event.offsetY - (boxHeight / 2)}px`;
    box.style.left = `${event.offsetX - (boxWidth / 2)}px`;
})

function spawnFallingBoxes () {
    const fallingBox = document.createElement("div");

    fallingBox.classList.add("fallingBox");
    fallingBox.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
    wrapper.append(fallingBox)
    
    fallingBox.style.top = `${0 - fallingBox.offsetHeight}px`
    '`${wrapper.offsetTop}px`'
    fallingBox.style.left = `${Math.floor(Math.random() * (wrapper.offsetWidth - fallingBox.offsetWidth))}px`

    const interval = setInterval(() => {
        if (fallingBox.offsetTop < wrapper.offsetHeight) {
            fallingBox.style.top = `${fallingBox.offsetTop + fallSpeed}px`
        }
        else {
            clearInterval(interval);
            fallingBox.remove()
        }
    }, fallSpeedInterval);  
}

function checkCollision () {

}