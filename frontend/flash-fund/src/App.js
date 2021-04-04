import React from "react"
import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"
import * as ROUTES from "./routes/routes"
import Login from "./views/pages/login"
import Register from "./views/pages/register"
import Home from "./views/pages/home"
import Landing from "./views/pages/Landing"
import Four0Four from "./views/pages/Four0Four"
import NewCampaign from "./views/pages/NewCampaign"
import CampaignShow from "./views/pages/CampaignShow"
import Donate from "./views/pages/Donate"
import Pending from "./views/pages/Pending"

import ProtectedRoute from "./views/components/Protected"
import AdminRoute from "./views/components/AdminRoute"

import "./assets/css/App.css"

import { AuthProvider, useAuthContext } from "./context"
import AppHeader from "./views/AppHeader"

function App() {
  return (
    <AuthProvider>
      <AppHeader>
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
            <ProtectedRoute
              path={ROUTES.NEW_CAMPAIGN}
              component={NewCampaign}
            />
            <ProtectedRoute path={ROUTES.PENDING} component={Pending} />
            <Route path="*">
              <Four0Four />
            </Route>
          </Switch>
        </Router>
      </AppHeader>
    </AuthProvider>
  )
}

export default App
