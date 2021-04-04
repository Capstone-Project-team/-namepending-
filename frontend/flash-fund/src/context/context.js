import React, { createContext, useContext, useReducer } from "react"
import { initialState, AuthReducer } from "./reducer"

//create an auth context to use throughout the component tree
export const AuthContext = createContext()

//call function to use the context in a component
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

//provider to wrap components in so they have access to the context
export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
