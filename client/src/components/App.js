import '../App.css';
import { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import Login from './Login'
import Dashboard from './Dashboard'
import FreeHome from './FreeHome'
import Register from './Register'
import GameRender from './GameRender';

function App() {
  const [user, setUser] = useState()
  const [games, setGames] = useState()
  const [gameName, setGameName] = useState(null);

  useEffect(() => {
    fetch('/games')
    .then(resp => resp.json())
    .then(data => setGames(data))
  }, [user])

  useEffect(() => {
    setGameName(null)
  }, [user])

  console.log(gameName)
  if(!gameName) {
    return (
      <div style={{ backgroundColor: "black", height: "100vh" }}>
        <div>
          <NavBar user={user} setUser={setUser} setGameName={setGameName}/>
        </div>
        <Switch>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
          <Route path="/games">
            <Dashboard games={games} user={user} setGameName={setGameName} />
          </Route>
          <Route exact path="/" >
            <FreeHome />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <NavBar user={user} setUser={setUser} setGameName={setGameName}/>
        </div>
        <GameRender gameName={gameName} />
      </>
    )
  }
}

export default App;
