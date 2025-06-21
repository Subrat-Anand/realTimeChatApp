import { createSlice } from "@reduxjs/toolkit";

const onlineSocketSlice = createSlice({
    name: "onlineSocket",
    initialState: null,
    reducers:{
        setOnlineSocket:(state, action)=>{
            return action.payload
        }
    }
})

export const { setOnlineSocket } = onlineSocketSlice.actions;
export default onlineSocketSlice.reducer;