import React, { useState} from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { budgetActions } from '../../store/budget-slice'
import { billActions } from '../../store/bill-slice'
import food from '../../assets/food.png'
import travel from '../../assets/travel.png'
import miscellaneous from '../../assets/miscellaneous.png'
import health from '../../assets/health.png'
import entertainment from '../../assets/entertainment.png'
import trash from '../../assets/trash.png'
import paid from '../../assets/paid.png'
import unpaid from '../../assets/unpaid.png'
import BillModal from '../modal/userModal/addBillModal'
import './Bill.css'

const Bill = ({data}) => {
    const budget = useSelector(state => state.budget)
    const dispatch = useDispatch()
    const[showModal, setShowModal] = useState(false)
    const getImage = () => {
        if (data.category === 'health') return health
        if (data.category === 'food') return food
        if (data.category === 'travel') return travel
        if (data.category === 'miscellaneous') return miscellaneous
        if (data.category === 'entertainment') return entertainment
        else return miscellaneous
    }

    const handleStatusChange= () => {
        if (budget.budgetLeft < data.amount){
            toast.error("Not enough balance")
            return
        }
        dispatch(billActions.payBill({id:data.id, status: data.status === 'paid' ? 'unpaid' : 'paid'}))
        dispatch(budgetActions.handleBudget(data.status === 'paid' ?{amount:-data.amount} : {amount: data.amount}))
        toast.success(`Bill mark ${data.status === 'paid' ? 'unpaid' : 'paid'}`)

    }

    const handleDeleteBill = () => {
        dispatch(billActions.deleteBill({ id: data.id }))
    }
    return(
        <div className='bill-div'>
            <>
                <img className='bill-image' src={getImage()} alt='category' />
                <div className='bill-left'>
                    <div className='bill-description'>{data.description}</div>
                    <div className='bill-category'>₹{data.amount}</div>
                    <div className='bill-date'>{data.date}</div>
                </div>
            </>
            <div className='bill-left'>
                <div style={{display: 'flex', alignItems: 'center'}}>  <img className='bill-status' src={data.status === 'paid' ? paid : unpaid} alt='paid' /><span>{data.status === 'paid' ? 'Paid' : 'Unpaid'}</span></div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <div style={{marginRight: '10px'}} className='bill-update' onClick={() => setShowModal(true)}>Edit Bill</div>
                    <button className={data.status === 'paid' ? 'bill-status-change2' : 'bill-status-change1'} onClick={() => handleStatusChange()}>Mark as {data.status === 'paid' ? 'unpaid' : 'paid'}</button>
                    <img src={trash} className='bill-trash' alt='trash' onClick={() => handleDeleteBill()} />
                </div>
               
            </div>
            {showModal && <BillModal type="edit" setModal={setShowModal} data={data} />}
        </div>
    )
}

export default Bill