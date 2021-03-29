import React, { useState, useReducer } from "react"
const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

console.log(user)
export const initialState = {
  user: user ? JSON.parse(user) : {},
  token: token || "",
  //userType: "guest",
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "login-success":
      return {
        ...initialState,
        user: {
          email: action.payload.email,
          password: action.payload.password,
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
