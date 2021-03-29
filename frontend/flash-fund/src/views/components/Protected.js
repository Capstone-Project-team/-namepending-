import React from "react"
import { Redirect, Route } from "react-router"
import { useAuthContext } from "../../context"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useAuthContext().auth
  const test = true
  console.log("auth", auth)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          auth.user.userType === "student" ||
          auth.user.userType === "admin"
        ) {
          return <Component {...props} />
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
