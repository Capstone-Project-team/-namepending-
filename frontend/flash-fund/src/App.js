import React from "react"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import * as ROUTES from "./routes/routes"
import Login from "./views/components/login"
import Register from "./views/components/register"
import Home from "./views/components/home"
import Landing from "./views/components/Landing"
import Four0Four from "./views/components/Four0Four"
import NewCampaign from "./views/components/NewCampaign"
import CampaignShow from "./views/components/CampaignShow"
import Donate from "./views/components/Donate"
import Pending from "./views/components/Pending"

import ProtectedRoute from "./views/components/Protected"
import AdminRoute from "./views/components/AdminRoute"

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
          <Route exact path="/campaign/:id" component={CampaignShow}></Route>
          <ProtectedRoute
            exact
            path="/campaign/:id/donate"
            component={Donate}
          ></ProtectedRoute>
          <ProtectedRoute path={ROUTES.HOME} component={Home} />
          <ProtectedRoute path={ROUTES.NEW_CAMPAIGN} component={NewCampaign} />
          <ProtectedRoute path={ROUTES.PENDING} component={Pending} />
          <Route path="*">
            <Four0Four />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
