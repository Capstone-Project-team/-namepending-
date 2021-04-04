import React from "react"
import { Redirect, Route } from "react-router"
import { useAuthContext } from "../../context"

//currently unused
//should be used to authenticate routes for admin users
const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useAuthContext().auth
  return (
    <Route
      {...rest}
      render={(props) => {
        auth.userType === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }}
    ></Route>
  )
}

export default AdminRoute
