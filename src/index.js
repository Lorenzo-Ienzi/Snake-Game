import * as v from "./utils/variables.js"
import Snakepart from "./classes/Snakepart.js"

 let headSnakeX = 10
 let headSnakeY = 10
 let appleX = 5
 let appleY = 5
 let xVelocity = 0
 let yVelocity = 0
 let snakeparts = []
 let tailLength = 0
 let eatSound = new Audio("gulp.mp3")

 let startTouchX = 0
 let startTouchY = 0
 let endTouchX = 0
 let endTouchY = 0
 let boundary = 5

function loop() {
    moveSnake()
    if(isGameOver())
        return
    play()
    setTimeout(loop, 1000/v.speed)
}

loop()

function play(){
    clearScreen()
    checkAppleCollision()
    drawApple()
    drawSnake()
}

function clearScreen() {
    v.context.fillStyle = "black"
    v.context.fillRect(0,0, v.canvas.width, v.canvas.height)
}

function drawSnake(){
    v.context.fillStyle = "darkgreen"
    v.context.fillRect(headSnakeX * v.countSquares, headSnakeY * v.countSquares, v.snakeSize, v.snakeSize)

    v.context.fillStyle = "green"
    for (let i = 0; i < snakeparts.length; i++) {    
        v.context.fillRect(snakeparts[i].x * v.countSquares, snakeparts[i].y * v.countSquares, v.snakeSize, v.snakeSize)
    }

    snakeparts.push(new Snakepart(headSnakeX, headSnakeY))
    while(snakeparts.length > tailLength)
        snakeparts.shift()
}

function moveSnake() {
    headSnakeX = headSnakeX + xVelocity
    headSnakeY = headSnakeY + yVelocity
}

function drawApple() {
    v.context.fillStyle = "red"
    v.context.fillRect(appleX * v.countSquares, appleY * v.countSquares, v.snakeSize, v.snakeSize)
}

function checkAppleCollision(){
    if(appleX === headSnakeX && appleY === headSnakeY){
        appleX = Math.floor(Math.random() * v.snakeSize)
        appleY = Math.floor(Math.random() * v.snakeSize)
        tailLength++
        eatSound.play()
    }
}

document.body.addEventListener("keydown", ClickArrows)
document.body.addEventListener("touchstart", touchStart, false)
document.body.addEventListener("touchend", touchEnd, false)

function ClickArrows(event){
    switch(event.keyCode){
        // arrow up button
        case 38:
                if(yVelocity=== 1)
                    break
                yVelocity = -1
                xVelocity = 0
                break
        // down button
        case 40:
                if(yVelocity=== -1)
                    break
                yVelocity = 1
                xVelocity = 0
                break
        // right
        case 39:
                if(xVelocity=== -1)
                    break
                yVelocity = 0
                xVelocity = 1
                break
        // left
        case 37: 
                if(xVelocity=== 1)
                    break
                yVelocity = 0
                xVelocity = -1
                break
    }
}

function swipeScreen(){
    // up
    if(endTouchY < startTouchY && (startTouchX - endTouchX < boundary || startTouchX - endTouchX < -boundary )){
        if(yVelocity=== 1)
            return
        yVelocity = -1
        xVelocity = 0
    }
    // down
    else if(endTouchY > startTouchY && (startTouchX - endTouchX < boundary || startTouchX - endTouchX < -boundary )){
        if(yVelocity=== -1)
            return
        yVelocity = 1
        xVelocity = 0
    }
    // right
    else if(endTouchX > startTouchX && (-(startTouchY - endTouchY) < -boundary || startTouchY - endTouchY < boundary )){
        if(xVelocity=== -1)
            return
            yVelocity = 0
            xVelocity = 1
    }
    // left
    else if(endTouchX < startTouchX &&(startTouchY - endTouchY < boundary || startTouchY - endTouchY < -boundary )){
        if(xVelocity=== 1)
            return
            yVelocity = 0
            xVelocity = -1
    }
}

function touchStart(event){
    console.log(event.changedTouches[0].clientY,"start y")
    console.log(event.changedTouches[0].clientX, "start x")
    startTouchX = event.changedTouches[0].clientX
    startTouchY = event.changedTouches[0].clientY
}
function touchEnd(event){
    console.log(event.changedTouches[0].clientY, "end y")
    console.log(event.changedTouches[0].clientX, "end x")
    endTouchX = event.changedTouches[0].clientX
    endTouchY = event.changedTouches[0].clientY
    swipeScreen()
}

function isGameOver(){
    let gameOver = false
    if(xVelocity === 0 && yVelocity === 0)
        return false
    if(headSnakeX < 0){
        gameOver = true
    }
    else if(headSnakeX === v.countSquares){
        gameOver = true
    }
    else if(headSnakeY < 0){
        gameOver = true
    }
    else if( headSnakeY === v.countSquares){
        gameOver = true
    }
    for (let i = 0; i < snakeparts.length; i++) {
        if(snakeparts[i].x === headSnakeX && snakeparts[i].y === headSnakeY){
            gameOver = true
            break
        }
    }
    if(gameOver){
        v.gameOverText.style.display = "block";
        v.tryAgainText.style.display = "block";
    }
    return gameOver
}