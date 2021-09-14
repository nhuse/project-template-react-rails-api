import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import Snake from './Snake/Snake'
import { useEffect, useState } from 'react'

export default function GameRender({ gameId, user }) {
    console.log(gameId)
    const [hiScores, setHiScores] = useState(null)
        useEffect(() => {
            if(gameId) {
                fetch(`/scores/${gameId}`)
                .then(resp => resp.json())
                .then(data => {
                    setHiScores(data)
                    console.log(data)}
                )
            }
        }, [gameId])

    if (gameId === 1) {
        return <Tetris hiScores={hiScores} gameId={gameId} user={user} />
    }
    else if (gameId === 2) {
        return <Snake hiScores={hiScores} gameId={gameId} user={user} />
    }
}