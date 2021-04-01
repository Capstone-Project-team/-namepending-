//functions that will invoke the corresponding reducer to change/update the context state
//dispatch found in reducer.js
//if login succesful call login-success
export const loginUser = async (dispatch, payload) => {
  dispatch({ type: "login-success", payload })
}

//TODO remove user from state
//then remove user from localStorage?
export const logoutUser = async (dispatch) => {
  dispatch({ type: "logout" })
  localStorage.removeItem("user")
  localStorage.removeItem("token")
}
