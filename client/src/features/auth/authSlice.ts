import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState, User } from "./authTypes"

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthChecked: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: ( state, action: PayloadAction<{ user: User, accessToken: string}>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthChecked = true
    },
	setAccessToken: ( state, action:PayloadAction<string> ) => { 
        state.accessToken = action.payload
	 },
	setAuthChecked:(state) => { 
		state.isAuthChecked = true
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthChecked = true
    }
  }
})

export const { setCredentials, setAuthChecked,logout,setAccessToken} = authSlice.actions
export default authSlice.reducer