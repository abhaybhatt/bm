import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
    name: "budget",
    initialState: { totalBudget: 0, budgetLeft: 0 },
    reducers: {
        setBudget(state, action) {
            state.totalBudget = action.payload
            state.budgetLeft = action.payload
        },
        handleBudget(state, action) {
            state.budgetLeft -= action.payload.amount
        }
    }
})

export const budgetActions = budgetSlice.actions
export default budgetSlice