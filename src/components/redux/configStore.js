import { configureStore } from "@reduxjs/toolkit";
import   countOrdersSlice  from "./reducer";
import UserDataReducer from "./UserDataReducer";
import  SignupAsSlice from "./SignupAs";
 export default configureStore({
    reducer:{
        counter:countOrdersSlice,
        userData:UserDataReducer,
        signupAs:SignupAsSlice}
});