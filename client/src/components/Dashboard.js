import { Redirect, Link, NavLink } from 'react-router-dom'
import './styles/GameCardStyles.css'

export default function Dashboard({ games, user, setGameId }) {
    console.log(games)
    function handleGameClick(id) {
        setGameId(id)
    }

    if(!user) {
        return <Redirect to="/login" />
    } else {
        return (
            <div className="game-flex-container">
                {games.map((game) => (
                    <div key={game.id} className="card" onClick={() => handleGameClick(game.id)}>
                        <Link to={`/games/${game.id}`} style={{ textDecoration: "none" }}>
                            <div className="game-info">
                                <img src={game.game_image_url} className="game-img" alt={`${game.name}-cover-art`} />
                                <h1>{game.name}</h1>
                                <p style={{ paddingBottom: "10px" }}>Genre: {game.genre}</p>
                            </div>
                        </Link>
                        <button>
                            <Link to={`games/${game.id}/reviews`}
                            style={{ color: "grey" }}
                            activeStyle={{ fontWeight: "bold", color: "black" }} >
                                Reviews
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}