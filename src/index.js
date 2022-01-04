const canvas = document.getElementById("area")
const context = canvas.getContext("2d")

let speed = 7
let countSquares = 20
let headSnakeX = 0
let headSnakeY = 0

function loop() {
    play()
    setTimeout(loop, 1000/speed)
}

function play(){
    clearScreen()
}

function clearScreen() {
    context.fillStyle = "black"
    context.fillRect(0,0, canvas.width, canvas.height)
}

// loop()