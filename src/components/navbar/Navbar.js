import React from 'react';
import './Navbar.css';
import avatar from '../../assets/avatar.svg';

const Navbar = ({ sidebar, openSidebar, setPage, page }) =>{
    const [option,setOption] = React.useState(1);

    return(
        <nav className="navbar">
            <div className="nav_icon" onClick={()=>openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>

            <div className="navbar__left">
                <a className={page === "bills" ? "active_link" : ""} onClick={() => setPage("bills")}>Bills</a>
                <a className={page === "stats" ? "active_link" : ""} onClick={() => setPage("stats")}>Graphs</a>
            </div>
{/* 
            <div className="navbar__right">
                <a href="#">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    </a>
                    <a href="#!">
                    <img width="30" src={avatar} alt="avatar" />
                </a>
            </div> */}
        </nav>
    )
}

export default Navbar;