import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./budget-slice";
import userSlice from "./user-slice";
import billsSlice from "./bill-slice";

const store = configureStore({
    reducer: {
        budget: budgetSlice.reducer,
        user: userSlice.reducer,
        bills: billsSlice.reducer
    }
})

export default store