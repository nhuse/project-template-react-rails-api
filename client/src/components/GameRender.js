import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import Snake from './Snake/Snake'
import { useEffect, useState } from 'react'
import { Reacteroids } from './Asteroids/Reacteroids'
import React from 'react';
import '../components/Asteroids/style.css';

export default function GameRender({ gameId, user }) {
    console.log(`gameRender ${gameId}`)
    const [hiScores, setHiScores] = useState([])
        useEffect(() => {
            if(gameId) {
                fetch(`/scores/${gameId}`)
                .then(resp => resp.json())
                .then(data => {
                    setHiScores(data)
                })
            }
        }, [])

    if (gameId === 1) {
        return <Tetris user={user} hiScores={hiScores} gameId={gameId} />
    } else if (gameId === 2) {
        return <Reacteroids hiScores={hiScores} gameId={gameId} userId={user.id} />
    } else if (gameId === 3) {
        return <Snake hiScores={hiScores} gameId={gameId} user={user} />
    }
}