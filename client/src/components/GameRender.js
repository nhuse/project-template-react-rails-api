import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import Snake from './Snake/Snake'

export default function GameRender({ gameName }) {
    console.log(gameName)
    if (gameName === "Tetris") {
        return <Tetris />
    }
    else if (gameName === "Snake") {
        return <Snake />
    }
}