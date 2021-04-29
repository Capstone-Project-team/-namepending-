const token = localStorage.getItem("token")
const expires_in = localStorage.getItem("expires_in")
const user = localStorage.getItem("user")

console.log(user)

//set initial state of context when page is rendered
//state is either data from local storage, or blank
export const initialState = {
  user: user ? JSON.parse(user) : {},
  token: token || "",
  expires_in: expires_in || "",
}

//initial state is state object to store context
//action is string of appropriate reducer case to be called, for example 'login-sucess', and data to be put in state
export const AuthReducer = (initialState, action) => {
  console.log("action", action)
  switch (action.type) {
    case "login-success":
      //update state
      return {
        ...initialState,
        user: {
          email: action.payload.email,
          userType: action.payload.userType,
        },
        token: action.payload.token, //action.payload.token,
        expires_in: action.payload.expires_in,
      }
    case "logout":
      return {
        ...initialState,
        user: {},
        token: "",
        expires_in: "",
      }
    default:
      throw new Error("cannot handle action")
  }
}
