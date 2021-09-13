import { useState } from "react"

export default function Reviews({ reviews, setReviews, userId, gameId }) {
    const [reviewContent, setReviewContent] = useState({
        review: '',
        user_id: userId,
        game_id: gameId
    })

    function handleChange(event) {
        setReviewContent({...reviewContent,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmitReview(event){
        event.preventDefault()
        await fetch(`/games/${gameId}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewContent)
        })
        .then(response => response.json())
        .then(data => setReviews(data
        ))
        setReviewContent({
            review: '',
            user_id: userId,
            game_id: gameId
        })
    }

    console.log(reviews)
    return (
        <div style={{ backgroundColor: "black", height: "95vh", color: "white", display: "flex", flexFlow: "column wrap", alignContent: "center" }}>
            <div className="review-wrapper">
                <h1>Reviews</h1>
                <ul style={{ listStyle: "none", width: "500px", padding: "0px" }}>
                {reviews.map(review => {
                    return <li key={review.id} className="review-li">"{review.review}" by {review.user.name}</li>     
                })}
                </ul>
            </div>
            <div className="review-signup-form-wrapper">
                <form onSubmit={handleSubmitReview} className="login-signup-form">
                    <label htmlFor="review">Rate our game</label><br/><br/>
                    <textarea rows="5" cols="50" name="review" id="review" value={reviewContent.review} onChange={handleChange} style={{ width: "400px", height: "100px" }}/><br/>
                    <button>Submit Review</button>
                </form>
            </div>
        </div>
    )
}