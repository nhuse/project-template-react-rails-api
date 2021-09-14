import React, { useState, useEffect } from 'react'
import './SnakeGame.css'
import GameOver from './GameOver.js'

export default function Snake({ props }) {
  //constants gameboard
  let percentageWidth = 40
  let width =
    window.innerWidth *
    (percentageWidth / 100)
  width -= width % 30
  if (width < 30) width = 30
  const height = (width / 3) * 2
  const blockWidth = width / 30
  const blockHeight = height / 20
  const snakeColor = 'green';
  const appleColor = 'red';
  
  //state variables
  const [gameLoopTimeout, setGameLoopTimeout] = useState(50)
  const [timeoutId, setTimeoutId] = useState(0)
  const [snakeSize, setSnakeSize] = useState(0)
  const [snake, setSnake] = useState([])
  const [apple, setApple] = useState({})
  const [direction, setDirection] = useState('right')
  const [changeDirection, setChangeDirection] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    initGame()
    window.addEventListener('keydown', handleKeyDown)
    gameLoop()
    return function cleanup(){
      clearTimeout(timeoutId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [props])
  //htk come back to this 


  function initGame() {
    // snake initialization
    let startSnakeSize = 6
    let snake = []
    let Xpos = width / 2
    let Ypos = height / 2
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 }
    snake.push(snakeHead)
    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth
      let snakePart = { Xpos: Xpos, Ypos: Ypos }
      snake.push(snakePart)
    }

    // apple position initialization
    let appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }
    setSnake(snake)
    setApple({ Xpos: appleXpos, Ypos: appleYpos })
  }

  function gameLoop() {
    let timeoutId = setTimeout(() => {
      if (!isGameOver && snake.length >= 0) {
        moveSnake()
        tryToEatSnake()
        tryToEatApple()
        setChangeDirection(false)
      }

      gameLoop()
    }, gameLoopTimeout)

    setTimeoutId(timeoutId)
  }

  function resetGame() {
    let apple = apple
    // snake reset
    let snake = []
    let Xpos = width / 2
    let Ypos = height / 2
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 }
    snake.push(snakeHead)
    for (let i = 1; i < 6; i++) {
      Xpos -= blockWidth
      let snakePart = { Xpos: Xpos, Ypos: Ypos }
      snake.push(snakePart)
    }

    // apple position reset
    apple.Xpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth
    apple.Ypos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight
    while (isAppleOnSnake(apple.Xpos, apple.Ypos)) {
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
    }
    setSnake(snake)
    setApple(apple)
    setDirection('right')
    setChangeDirection(false)
    setIsGameOver(false)
    setGameLoopTimeout(50)
    setScore(0)
  }

  function moveSnake() {
    let previousPartX = snake[0].Xpos
    let previousPartY = snake[0].Ypos
    let tmpPartX = previousPartX
    let tmpPartY = previousPartY
    moveHead()
    for (let i = 1; i < snake.length; i++) {
      tmpPartX = snake[i].Xpos
      tmpPartY = snake[i].Ypos
      snake[i].Xpos = previousPartX
      snake[i].Ypos = previousPartY
      previousPartX = tmpPartX
      previousPartY = tmpPartY
    }
    setSnake(snake)
  }

  function tryToEatApple() {
    // if the snake's head is on an apple
    if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
      let width = width
      let height = height
      let blockWidth = blockWidth
      let blockHeight = blockHeight
      let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos }
      let highScore = highScore
      let newHighScore = newHighScore
      let gameLoopTimeout = gameLoopTimeout

      // increase snake size
      snake.push(newTail)

      // create another apple
      apple.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth
      apple.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight
      while (isAppleOnSnake(apple.Xpos, apple.Ypos)) {
        apple.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth
        apple.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight
      }

      // decrease the game loop timeout
      if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5

      setSnake(snake)
      setApple(apple)
      setScore(score+1)
      setGameLoopTimeout(gameLoopTimeout)
    }
  }

  useEffect(()=>{
    if (isGameOver) {
      fetch('/scores', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            game_id: props.gameId,
            user_id: props.user.id,
            score: score
        })
      }) 
    }
  }, [isGameOver])


  function tryToEatSnake() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos) {
        setIsGameOver(true)  
      }
    }
  }

  function isAppleOnSnake(appleXpos, appleYpos) {
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos) {
        return true
      }
    return false
   }
  }

  function moveHead() {
    switch (direction) {
      case 'left':
        moveHeadLeft()
        break
      case 'up':
        moveHeadUp()
        break
      case 'right':
        moveHeadRight()
        break
      default:
        moveHeadDown()
    }
  }

  function moveHeadLeft() {
    snake[0].Xpos =
      snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth
    setSnake(snake)
  }

  function moveHeadUp() {

    snake[0].Ypos =
      snake[0].Ypos <= 0 ? height - blockHeight : snake[0].Ypos - blockHeight
      setSnake(snake)
  }

  function moveHeadRight() {
    snake[0].Xpos =
      snake[0].Xpos >= width - blockWidth ? 0 : snake[0].Xpos + blockWidth
      setSnake(snake)
  }

  function moveHeadDown() {
    snake[0].Ypos =
      snake[0].Ypos >= height - blockHeight ? 0 : snake[0].Ypos + blockHeight
      setSnake(snake)
  }

  function handleKeyDown(event) {
    // if spacebar is pressed to run a new game
    if (isGameOver && event.keyCode === 32) {
      resetGame()
      return
    }
    debugger
    if (changeDirection) return

    switch (event.keyCode) {
      case 37:
      case 65:
        goLeft()
        break
      case 38:
      case 87:
        goUp()
        break
      case 39:
      case 68:
        goRight()
        break
      case 40:
      case 83:
        goDown()
        break
      default:
    }
    setChangeDirection(true)
  }

  function goLeft() {
    let newDirection = direction === 'right' ? 'right' : 'left'
    setDirection(newDirection)
  }

  function goUp() {
    debugger
    let newDirection = direction === 'down' ? 'down' : 'up'
    setDirection(newDirection)
  }

  function goRight() {
    let newDirection = direction === 'left' ? 'left' : 'right'
    setDirection(newDirection)
  }

  function goDown() {
    let newDirection = direction === 'up' ? 'up' : 'down'
    setDirection(newDirection)
  }

    return (
      <div>
      {isGameOver ?
          <GameOver
            width={width}
            height={height}
            score={score}
          />
        : 
      <div
        id='GameBoard'
        style={{
          width: width,
          height: height,
          borderWidth: width / 50,
          color: 'white'
        }}>
        {snake.map((snakePart, index) => {
          return (
            <div
              key={index}
              className='Block'
              style={{
                width: blockWidth,
                height: blockHeight,
                left: snakePart.Xpos,
                top: snakePart.Ypos,
                background: snakeColor,
              }}
            />
          )
        })}
        <div
          className='Block'
          style={{
            width: blockWidth,
            height: blockHeight,
            left: apple.Xpos,
            top: apple.Ypos,
            background: appleColor,
          }}
        />
        <div id='Score' style={{ fontSize: width / 20 }}>
          SCORE:{' '}
          {score}
        </div>
      </div>
      }
    </div>
  )
}

