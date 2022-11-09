import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { billActions } from '../../../store/bill-slice'
import cross from '../../../assets/unpaid.png'
import './modal.css'

const BillModal = ({ type = "add", setModal, data }) => {
    const dispatch = useDispatch()
    const unique_id = uuid();
    const [description, setDescription] = React.useState(type ==="edit" ? data.description : "")
    const [amount, setAmount] = useState(type === "edit" ? data.amount : null)
    const [date, setDate] = useState(type === "edit" ? data.date : null)
    const [category, setCategory] = useState(type === "edit" ? data.category : "miscellaneous")

    const addBill = () => {
        if(description === "" || amount <=0 || date === ''){
            toast.error("Fill all details")
            return
        }
        if(type === 'edit'){
            dispatch(billActions.editBill({
                description: description,
                category: category,
                amount: amount,
                date: date,
                status: data.status,
                id: data.id
            }))
            toast.success("Bill updated")
            setModal(false)
            return
        }else{
            dispatch(billActions.addBill({
                description: description,
                category: category,
                amount: amount,
                date: date,
                status: "unpaid",
                id: unique_id.slice(0, 8)
            }))
            toast.success("Bill added")
            setModal("")
        }
      
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className='modal-heading'>{type === 'add' ? 'Add bill details' : 'Edit bill details'}</div>
                    <img alt='cross' src={cross} style={{ height: '30px', width: '30px', cursor: 'pointer' }} onClick={() => setModal("")} />
                </div>
                <label className='modal-label'>Enter Description</label>
                <input className='modal-input' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='eg. KFC' />
                <label className='modal-label' style={{ marginTop: '20px' }}>Enter Bill Amount</label>
                <input className='modal-input' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='1000' />
                <label className='modal-label' style={{ marginTop: '20px' }}>Enter Due Date</label>
                <input className='modal-input' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <label className='modal-label' style={{ marginTop: '20px' }}>Enter Bill Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='modal-input' id="cars" name="cars">
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                </select>
                <button className='modal-button' onClick={() => addBill()}>{type === 'edit' ? 'Edit' : 'Add'}</button>
            </div>
        </div>
    )
}

export default BillModal

