import React, {useState} from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { userActions } from '../../../store/user-slice'
import { budgetActions } from '../../../store/budget-slice'
import './modal.css'

const UserModal = () => {
    const dispatch = useDispatch()
    const[name, setName] = React.useState("")
    const[budget, setBudget] = useState(0)

    const handleSignup = () => {
        if(name === ""){
            toast.error("Enter valid name")
            return
        }
        if ( budget <= 0) {
            toast.error("Enter valid budget")
            return
        }
        dispatch(userActions.setName(name))
        dispatch(budgetActions.setBudget(budget))
    }

    return(
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-heading'>Lets get started.</div>
                <label className='modal-label'>Enter your name</label>
                <input className='modal-input' value={name} onChange={(e) => setName(e.target.value) } placeholder='Naruto' />
                <label className='modal-label' style={{marginTop: '20px'}}>Enter your monthly budget</label>
                <input className='modal-input' type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder='1000' />
                <button className='modal-button' onClick={() => handleSignup()}>Continue</button>
            </div>
        </div>
    )
}

export default UserModal

