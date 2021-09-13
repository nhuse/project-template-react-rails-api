import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'

export default function GameRender({ gameName }) {
    console.log(gameName)
    if (gameName === "Tetris") {
        return <Tetris />
    }
}