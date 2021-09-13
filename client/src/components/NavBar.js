import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom";
import './styles/NavBarStyles.css'

export default function NavBar({ user, setUser, setGameName }) {
    const history = useHistory()
    function handleLogoutClick() {
        fetch('/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function() {
            setUser(null)
            setGameName(null)
            history.push('/')
        })
    }

    function handleClick() {
        setGameName(null)
    }

    return (
        <nav className="nav-bar" >
            { user ? 
            <button className="nav-button" onClick={handleClick} >
                <NavLink exact to="/games"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Home
                </NavLink>
            </button > :
            null
            }
            { user ? 
            <button onClick={handleLogoutClick} className="logout-button" >Logout</button> 
            :
            <button className="nav-button" onClick={handleClick} >
                <NavLink to="/login"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Login
                </NavLink>
            </button>
            }
            { user ?
            <button className= "nav-button" onClick={handleClick} >
                <NavLink to="/profile"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Hello, {user.name}
                </NavLink> 
            </button> 
            :
            <button className= "nav-button" onClick={handleClick} >
                <NavLink to="/register"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Register
                </NavLink> 
            </button> }
        </nav>
    )
}