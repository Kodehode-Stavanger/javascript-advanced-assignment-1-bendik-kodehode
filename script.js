const box = document.getElementById("box");
const main = document.getElementById("main");
const container = document.getElementById("container");

box.style.width = "30px";
box.style.height = "30px";
main.style.width = "500px";
main.style.height = "500px";

const boxHeight = parseInt(box.style.height)
const boxWidth = parseInt(box.style.width)
const mainHeight = parseInt(main.style.height)
const mainWidth = parseInt(main.style.width)

container.style.height = `${mainHeight / 4}px`;
container.style.width = `${mainWidth}px`;
const containerHeight = parseInt(container.style.height);
const containerWidth = parseInt(container.style.width);

box.style.top = `${containerHeight - boxHeight}px`;
box.style.left = `${(mainWidth / 2) - (boxWidth / 2)}px`;

const moveSpeed = 20;

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
        if (boxLeft >= (mainWidth - boxWidth - moveSpeed)) box.style.left = `${containerWidth - boxWidth}px`
        else box.style.left = `${boxLeft + moveSpeed}px`
    }
    // console.log(event)
    console.log(mainHeight - boxHeight)
    console.log("posTop: ", box.style.top)
    console.log("container height: ", containerHeight)
})

// function moveBox (direction) {
//     while ()
// }

main.addEventListener("click", (event) => {
    box.style.top = `${event.offsetY - (boxHeight / 2)}px`
    box.style.left = `${event.offsetX - (boxWidth / 2)}px`


    console.log(event.offsetX)
})