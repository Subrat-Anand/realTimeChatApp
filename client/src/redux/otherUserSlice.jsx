import { createSlice } from "@reduxjs/toolkit";

const otherUserSlice = createSlice({
    name: "otherUser",
    initialState: null,
    reducers:{
        setOtherUser:(state, action)=>{
            return action.payload
        }
    }
})

export const { setOtherUser } = otherUserSlice.actions;
export default otherUserSlice.reducer;