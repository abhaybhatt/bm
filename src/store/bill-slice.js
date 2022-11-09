import { createSlice } from "@reduxjs/toolkit";

const billsSlice = createSlice({
    name: "bills",
    initialState: { bills: [], total: 0, unpaid: 0 },
    reducers: {
        addBill(state, action) {
            state.bills.push(action.payload)
            state.total++;
            state.unpaid++;
        },
        payBill(state, action){
            const id = action.payload.id
            const status = action.payload.status
            const targetBill = state.bills.find((bill) => bill.id === id)
            if (targetBill) {
                targetBill.status = status
            }
            if(status === 'paid'){
                state.unpaid--;
            }else{
                state.unpaid++;
            }
        },
        editBill(state, action){
            const id = action.payload.id
            const targetBill = state.bills.find((bill) => bill.id === id)
                targetBill.status = action.payload.status
                targetBill.description = action.payload.description
                targetBill.category = action.payload.category
                targetBill.amount = action.payload.amount
                targetBill.date = action.payload.date

        },
        deleteBill(state, action) {
            const id = action.payload.id
            const targetBill = state.bills.find((bill) => bill.id === id)
            if(targetBill){
                state.bills = state.bills.filter((bill) => bill.id !== id)
                state.total--;
                if (targetBill.status === 'unpaid'){
                    state.unpaid--;
                }
            }
        }
    }
})

export const billActions = billsSlice.actions
export default billsSlice

// bill = {
//     id,
//     status,
//     date,
//     amount,
    //    category
    // description
// }
