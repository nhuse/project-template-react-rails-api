import './styles/GameCardStyles.css'
import Tetris from './Tetris/Tetris'
import { Reacteroids } from './Asteroids/Reacteroids'
import React from 'react';
import { render } from 'react-dom';
import style from '../components/Asteroids/style.css';

export default function GameRender({ gameName, setAsteroidsHS }) {
    console.log(gameName)
    if (gameName === "Tetris") {
        return <Tetris />
    } else if (gameName === "Asteroids") {
        return <Reacteroids setAsteroidsHS={setAsteroidsHS}/>
    }
}