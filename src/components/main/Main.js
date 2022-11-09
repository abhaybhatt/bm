import React, { useEffect, useState } from 'react'
import Stats from './Stats';
import Bill from '../bill/Bill';
import plus from '../../assets/plus.png'
import down from '../../assets/down.png'
import "./Main.css";
import hello from "../../assets/hello.svg";
import { useSelector } from "react-redux";

const Main = ({ setModal, page }) => {
  const name = useSelector((state) => state.user.name)
  const budget = useSelector((state) => state.budget)
  const bills = useSelector((state) => state.bills)
  const [filteredBills, setFilteredBills] = useState([])
  const [selected, setSelected] = useState('All')
  const [open, setOpen] = useState(false)
  const addButton = () => {
    return(
      <div className='add-button' onClick={() => setModal("bill")}>
        <img className='add-button-image' src={plus} />
      </div>
    )
  }

  useEffect(() => {
    setFilteredBills(bills.bills)
  }, [bills])

  useEffect(() => {
    if(selected === 'All'){
      setFilteredBills(bills.bills)
    }else{
      setFilteredBills(bills.bills.filter((bill) => bill.category === selected))
    }
  },[selected, bills.bills])
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello {name}</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Unpaid Bills</p>
              <span className="font-bold text-title">{bills.unpaid}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Bills</p>
              <span className="font-bold text-title">{bills.total}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-video-camera fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Budget Left</p>
              <span className="font-bold text-title">₹{budget.budgetLeft}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-thumbs-up fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Budget</p>
              <span className="font-bold text-title">₹{budget.totalBudget}</span>
            </div>
          </div>
        </div>
      </div>
      
      {page === 'bills' && (
        <>
          {filteredBills.length === 0 && (
            <div className='no-bill'>No bills added</div>
          )}
          {<div className='add-filter'>
            <button className='add-filter-btn' onClick={() => setOpen(true)}>
              {selected}
              <img className='down-button-image' src={down} />
            </button>
            {open && (
              <ul className="filter-drop-down">
                <li onClick={() => {
                  setSelected('All')
                  setOpen(false)
                }}>All</li>
                <li onClick={() => {
                  setSelected('miscellaneous')
                  setOpen(false)
                }}>Miscellaneous</li>
                <li onClick={() => {
                  setSelected('food')
                  setOpen(false)
                }}>Food</li>
                <li onClick={() => {
                  setSelected('travel')
                  setOpen(false)
                }}>Travel</li>
                <li onClick={() => {
                  setSelected('entertainment')
                  setOpen(false)
                }}>Entertainment</li>
                <li onClick={() => {
                  setSelected('health')
                  setOpen(false)
                }}>Health</li>
              </ul>
            )}

          </div>
          }
          {
            filteredBills.map((bill) => (
              <Bill data={bill} />
            ))
          }
          {addButton()}
        </>
      )}
      {page === 'stats' && <Stats />}
      
    </main>
  );
};

export default Main;