import { createSlice } from "@reduxjs/toolkit";

const selectedUserSlice = createSlice({
    name: "selectedUser",
    initialState: null,
    reducers:{
        selectedUser:(state, action)=>{
            return action.payload
        }
    }
})

export const { selectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;