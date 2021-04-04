const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

console.log(user)

//set initial state of context when page is rendered
//state is either data from local storage, or blank
export const initialState = {
  user: user
    ? JSON.parse(user)
    : {
        /*email: "test", userType: "admin"*/
      },
  token: token || "",
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
        token: "fakeToken", //action.payload.token,
        //userType: userType, //action.payload.userType,
      }
    case "logout":
      return {
        ...initialState,
        user: {},
        token: "",
      }
    default:
      throw new Error("cannot handle action")
  }
}
