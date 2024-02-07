const box = document.getElementById("box");
const main = document.getElementById("main");

box.style.width = "30px";
box.style.height = "30px";
main.style.width = "500px";
main.style.height = "500px";

const boxHeight = parseInt(box.style.height)
const boxWidth = parseInt(box.style.width)
const mainHeight = parseInt(main.style.height)
const mainWidth = parseInt(main.style.width)

box.style.top = `${mainHeight - boxHeight}px`;
box.style.left = `${(mainWidth / 2) - boxWidth}px`;

const moveSpeed = 20;

window.addEventListener("keydown", (event) => {
    const boxTop = parseInt(box.style.top);
    const boxLeft = parseInt(box.style.left)

    if (event.key === "w" || event.key === "ArrowUp") {
        if (boxTop < (0 + boxHeight)) box.style.top = `${mainHeight - boxHeight}px`
        else box.style.top = `${boxTop - moveSpeed}px`
    }
    else if (event.key === "s" || event.key === "ArrowDown") {
        if (boxTop >= (mainHeight - boxHeight - moveSpeed)) box.style.top = "0px"
        else box.style.top = `${boxTop + moveSpeed}px`
    }
    else if (event.key === "a" || event.key === "ArrowLeft") {
        if (boxLeft < (0 + boxWidth)) box.style.left = `${mainWidth - boxWidth}px`
        else box.style.left = `${boxLeft - moveSpeed}px`
    }
    else if (event.key === "d" || event.key === "ArrowRight") {
        if (boxLeft >= (mainWidth - boxWidth - moveSpeed)) box.style.left = "0px"
        else box.style.left = `${boxLeft + moveSpeed}px`
    }
    // console.log(event)
    console.log(mainHeight - boxHeight)
    console.log("pos: ", box.style.left)
})

main.addEventListener("click", (event) => {
    box.style.top = `${event.offsetY}px`
    box.style.left = `${event.offsetX}px`


    console.log(event.offsetX)
})