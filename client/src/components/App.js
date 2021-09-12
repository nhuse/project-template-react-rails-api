import '../App.css';
import { useState } from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from './NavBar'
import Login from './Login'
import AuthHome from './AuthHome'
import FreeHome from './FreeHome';
import Register from './Register'

function App() {
  const [user, setUser] = useState()
  return (
    <div style={{ backgroundColor: "grey" }}>
      <div>
        <NavBar user={user} setUser={setUser}/>
      </div>
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/register">
          <Register setUser={setUser}/>
        </Route>
        <Route exact path="/">
          { user ? 
          <AuthHome /> :
          <FreeHome /> }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
