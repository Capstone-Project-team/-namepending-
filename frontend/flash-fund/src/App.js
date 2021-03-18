import React from "react"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import * as ROUTES from "./routes/routes"
import Login from "./views/components/login"
import Register from "./views/components/register"
import Home from "./views/components/home"
import Landing from "./views/components/Landing"
import Four0Four from "./views/components/Four0Four"

import ProtectedRoute from "./views/components/Protected"

import "./assets/css/App.css"

import { AuthProvider, useAuthContext } from "./context"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Landing />
          </Route>
          <Route exact path={ROUTES.REGISTER}>
            <Register />
          </Route>
          <Route exact path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <ProtectedRoute path={ROUTES.HOME} component={Home} />
          <Route path="*">
            <Four0Four />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
