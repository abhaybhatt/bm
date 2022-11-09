import { useEffect, useState } from 'react';
import UserModal from './components/modal/userModal/userModal.js';
import BillModal from './components/modal/userModal/addBillModal.js';
import Navbar from './components/navbar/Navbar.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Main from './components/main/Main.js';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () =>{
  const name = useSelector(state => state.user.name)
  const[sidebar, setSidebar] = useState(false);
  const[modal, setModal] = useState("")
  const[page, setPage] = useState('bills')

  useEffect(() => {
    if(name === ""){
      setModal("user")
    }else{
      setModal("")
    }
  },[name])

  const openSidebar = () =>{
    setSidebar(true);
  }

  const loadModals = () => {
    if(modal === "user"){
      return (<UserModal />)
    }
    else if(modal === "bill"){
      return (<BillModal setModal={setModal} />)
    }
  }

  const closeSidebar = () =>{
    setSidebar(false);
  }
  return (
    <div className="container">
      <Toaster />
      {loadModals()}
      <Navbar sidebar={sidebar} openSidebar={openSidebar} setPage={setPage} page={page}/>
      <Main setModal={setModal} page={page} />
      {/* <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} /> */}
    </div>
  );
}

export default App;
