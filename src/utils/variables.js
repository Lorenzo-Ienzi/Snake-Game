export const canvas = document.getElementById("area")
export const context = canvas.getContext("2d")

export let speed = 7
export let countSquares = 20
export let snakeSize = canvas.width / countSquares -2
export let gameOverText = document.getElementById("game-over")
export let tryAgainText = document.getElementById("try-again")
export let scoreText = document.getElementById("score")
 