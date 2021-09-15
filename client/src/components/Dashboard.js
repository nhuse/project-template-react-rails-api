import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/GameCardStyles.css'

export default function Dashboard({ games, setGames, setGameId }) {

    function handleGameClick(id) {
        setGameId(id)
    }

    useEffect(() => {
        fetch(`/games`)
        .then(resp => resp.json())
        .then(data => setGames(data))
    }, [])
    
        return (
            <div className="game-flex-container">
                {games.map((game) => {
                    return (
                        <div key={game.id} className="card" onClick={() => handleGameClick(game.id)}>
                            <Link to={`/games/${game.id}`} style={{ textDecoration: "none" }}>
                                <div className="game-info">
                                    <img src={game.game_image_url} className="game-img" alt={`${game.name}-cover-art`} />
                                    <h1>{game.name}</h1>
                                    <p style={{ paddingBottom: "10px" }}>Genre: {game.genre}</p>
                                </div>
                            </Link>
                            <button className="review-button">
                                <Link to={`/games/${game.id}/reviews`}
                                style={{ color: "grey" }}
                                activeStyle={{ fontWeight: "bold", color: "black" }} >
                                    Reviews
                                </Link>
                            </button>
                            <h2 style={{color: "white"}}>Highscores:</h2>
                            <ul style={{color: "white"}}>
                                {game.highscores_all_users.map((score_board)=>{
                                    return (
                                        <li style={{ color: "white", listStyleType: "none" }}>Player id {score_board.user_id}: {score_board.score}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )   
                })}
            </div>
        )
}