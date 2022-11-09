import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
const stats = [
    {
        "name": "Jan",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Feb",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Mar",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Apr",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "May",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Jun",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Jul",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Aug",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Sep",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Oct",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Nov",
        "paid": 0,
        "unpaid": 0
    },
    {
        "name": "Dec",
        "paid": 0,
        "unpaid": 0
    }
]
const Stats = () => {
    const[data, setData] = useState(stats)
    const bills = useSelector((state) => state.bills)

    useEffect(() => {
        console.log(data)
        const newData = data
        bills.bills.map((bill) => {
            let month = bill.date.substr(5,7)
            month = parseInt(month)
            if(bill.status === 'paid'){
                const n = parseInt(newData[month - 1].paid) + parseInt(bill.amount)
                newData[month-1].paid = n
            }else{
                const n = parseInt(newData[month - 1].unpaid) + parseInt(bill.amount)
                newData[month - 1].unpaid = n
            }
        })
        setData(newData)
    }, [bills.bills])
    if(bills.bills.length === 0) {
        return(
            <div className='no-bill'>No bills present</div>
        )
    }

    return(
    < BarChart width = { 730} height = { 250} data = { data } >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="paid" fill="#8884d8" />
        <Bar dataKey="unpaid" fill="#82ca9d" />
    </BarChart >
    )
}

export default Stats