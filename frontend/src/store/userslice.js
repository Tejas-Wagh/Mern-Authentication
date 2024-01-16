import {createSlice} from "@reduxjs/toolkit";

export const userSlice= createSlice({
    name:"user",
    initialState:{
        user:{},
        isLoading:false,
        isError:false,
    },
    reducers:{
        signInStarted(state){
            state.isLoading=true;
            state.isError=false;
        },
        signInSuccess(state,action){
            state.isLoading=false;
            state.isError=false;
            state.user=action.payload;
        },
        signInFailed(state){
            state.isError=true;
            state.isLoading=false;
        },
        updateStarted(state){
            state.isLoading=true;
            state.isError=false;
        },
        updateSuccess(state,action){
            state.user=action.payload;
            state.isLoading=false;
            state.isError=false;
        },
        updateFailed(state){
            state.isError=true;
            state.isLoading=false;
        },
        deleteStarted(state){
            state.isLoading=true;
        },
        deleteSuccess(state){
            state.user=null;
            state.isError=false;
            state.isLoading=false;
        },
        deleteFailed(state){
            state.isError=true;
            state.isLoading=false;
        },
        signOutSuccess(state){
            state.isLoading=false;
            state.isError=false;
            state.user=null;
        },
        reset(state){
            state.isError=false,
            state.isLoading=false;
        }
           
    }
})

export const userActions= userSlice.actions;