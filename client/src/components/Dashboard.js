import { Redirect, Link } from 'react-router-dom'
import './styles/GameCardStyles.css'

export default function Dashboard({ games, user, setGameName }) {
    function handleClick(name) {
        setGameName(name)
    }

    if(!user) {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="game-flex-container">
                {games.map((game) => (
                    <div key={game.id} className="card" onClick={() => handleClick(game.name)}>
                        <Link to={`/games/${game.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
                            <div className="game-info">
                                <img src={game.game_image_url} className="game-img" alt={`${game.name}-cover-art`} />
                                <h1>{game.name}</h1>
                                <p style={{ paddingBottom: "10px" }}>Category: {game.genre}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}