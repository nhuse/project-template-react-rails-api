import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import Snake from './Snake/Snake'
import { useEffect, useState } from 'react'
import { Reacteroids } from './Asteroids/Reacteroids'
import React from 'react';
import '../components/Asteroids/style.css';

export default function GameRender({ gameId, user, setAsteroidsHS }) {
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
        return <Tetris user={user}/>
    } else if (gameId === 2) {
        return <Reacteroids setAsteroidsHS={setAsteroidsHS} />
    } else if (gameId === 3) {
        return <Snake hiScores={hiScores} gameId={gameId} user={user} />
    }
}