import { createSlice } from "@reduxjs/toolkit";
export const SignupAsSlice=createSlice({name:"signupAs",
    initialState:{signupAs:""},
    reducers:{
        setAcc:(state,action)=>{
            state.signupAs=action.payload;
        } 
    }
})
export const {setAcc } = SignupAsSlice.actions;
export default SignupAsSlice.reducer;