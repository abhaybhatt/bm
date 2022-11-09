import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { name: "" },
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
    }
})

export const userActions = userSlice.actions
export default userSlice