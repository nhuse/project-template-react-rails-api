import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import { useEffect, useState } from 'react'
import { Reacteroids } from './Asteroids/Reacteroids'
import React from 'react';
import { render } from 'react-dom';
import style from '../components/Asteroids/style.css';

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
        return <Tetris />
    } else if (gameId === 2) {
        return <Reacteroids setAsteroidsHS={setAsteroidsHS}/>
    }
}