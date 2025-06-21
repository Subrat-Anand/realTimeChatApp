import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: [],
    reducers:{
        setMessages:(state, action)=>{
            return action.payload
        }
    }
})

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;