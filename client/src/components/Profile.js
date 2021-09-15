import { useState, useEffect } from 'react'
import './styles/ProfileStyle.css'

export default function Profile({ reviews, user, games, setReviews }){
    const [userScores, setUserScores] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editedReview, setEditedReview] = useState({
        review: ''
    })
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    useEffect(() => {
        fetch(`/scores/${user.id}`)
        .then(resp => resp.json())
        .then(data => setUserScores(data))
    }, [])

    async function handleDelete(id) {
        await fetch(`/reviews/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setReviews(data)
        })
    }
    
    async function handleEdit() {
        setIsEditing(true)
    }
    
    function handleChange(e){
        setEditedReview({
            [e.target.name]: e.target.value
        })
    }
    
    async function handleSubmitEdit(e, id) {
        e.preventDefault()
        await fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedReview)
        })
        .then(response => response.json())
        .then(data => {
            setReviews(data)
            setIsEditing(false)
        })
        setEditedReview({review: ''})
        }
        
        let userReviews = []
        if(reviews) {
            userReviews = reviews.filter(r => r.user_id === user.id)
        }

    return (
        <div style={{ color: "white", display: "flex" }} id="profile-wrapper" >
            <div className="all-user-reviews-wrapper">
                <h1>Your Reviews</h1>
                {games.map(game => {
                    const filteredReviews = userReviews.filter(r => r.game_id === game.id)
                    return (
                        <div key={game.id} className="profile-game-reviews-wrapper">
                            <h1 style={{ textDecoration: "underline" }}>{game.name}</h1>
                            <ul className="profile-game-reviews-ul">
                                {filteredReviews.map(r => {
                                    let date = new Date(r.created_at)
                                    let day = date.getDate()
                                    let month = months[date.getMonth()]
                                    let year = date.getFullYear()
                                    const dateString = `${month} ${day}, ${year}`
                                    return (
                                        <li key={r.id} className="profile-game-reviews-li">
                                            {isEditing ? (
                                                <form onSubmit={(e) => handleSubmitEdit(e, r.id)} className="login-signup-form">
                                                    <textarea rows="5" cols="50" name="review" value={editedReview.review} onChange={handleChange} style={{ width: "400px", height: "100px" }}/><br/>
                                                    <button>Submit Edit</button>
                                                </form>) 
                                                : <h2>"{r.review}" on {dateString}</h2> }
                                            <div>
                                                <button onClick={() => handleDelete(r.id)}>🗑️</button>
                                                <button onClick={() => handleEdit(r.id)}>✏️</button>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <div style={{ color: "white" }} className="all-user-highscores-wrapper">
                <h1>Your Scores</h1>
                {games.map(game => {
                    const filteredScores = userScores.filter(r => r.game_id === game.id)
                    return (
                        <div key={game.id} className="profile-game-scores-wrapper">
                            <h1 style={{ textDecoration: "underline" }}>{game.name}</h1>
                            <ul className="profile-game-scores-ul">
                                {filteredScores.map(s => {
                                    let date = new Date(s.created_at)
                                    let day = date.getDate()
                                    let month = months[date.getMonth()]
                                    let year = date.getFullYear()
                                    const dateString = `${month} ${day}, ${year}`
                                    return (
                                        <li key={s.id} style={{listStyleType: "none" }} className="profile-game-scores-li">
                                            <h2>{s.score} points on {dateString}</h2> 
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
