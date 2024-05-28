import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    module: "",
    redirectTo: ""
}

export const redirectSlice = createSlice({
    name: "redirection",
    initialState,
    reducers: {
        setModule: (state, action) => {
            console.log(action)
            state.module = action.payload
        }
    }
})

export const {
    setModule,
  } = redirectSlice.actions;
  
  export default redirectSlice.reducer;