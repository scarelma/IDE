import React from "react";
import "../NavbarMain/NavbarMain.css"
import logo from "./../../assets/images/logo.ico"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faBars, faChartLine, faBell, faSatelliteDish} from "@fortawesome/free-solid-svg-icons";
import sensor from "./../../assets/images/sensors.png"
import UsernameMenu from "../UsernameMenu/UsernameMenu";
import { Navigate, useNavigate } from "react-router-dom";

const NavbarMain = (props) => {
    library.add(faUser, faBars, faChartLine,faBell,faSatelliteDish)

    const navigate = useNavigate()


    return(
        <div className="Navbar-main">
            <div className="navbar-div">
                <div className="logo logo-navbar-main">
                    <FontAwesomeIcon icon="fa-solid fa-bars" onClick={(e)=>{props.navbarVisibility.setDisplaySidebar(!props.navbarVisibility.displaySidebar)}}/>
                    <div className="logo-img"></div>
                    <h4></h4>
                </div>
                <div className="username-div-wrapper">
                    <div className="username-div" onClick={(e)=>{props.menuVisibility.setDisplayMenu(!props.menuVisibility.displayMenu)}}>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        <h5>{localStorage.getItem("name")}</h5>
                    </div>
                </div>
            </div>
            {props.menuVisibility.displayMenu == true ? <UsernameMenu />:<></>}
            <div className="sidebar" style={{width: props.navbarVisibility.displaySidebar == true ? "200px":""}}>
                {/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}

                <div className="sidebar-items" onClick={() => {navigate("/user-profile")}}>
                    <FontAwesomeIcon icon="fa-solid fa-chart-line"  className="sidebar-icons-2"/>
                    <h5 style={{display: props.navbarVisibility.displaySidebar == true ? "block":"none" }}>Profile</h5>
                </div>

                <div className="sidebar-items" onClick={() => {navigate("/codelist")}}>
                    <FontAwesomeIcon icon="fa-solid fa-bell"  className="sidebar-icons-2"/> 
                    <h5 style={{display: props.navbarVisibility.displaySidebar == true ? "block":"none" }}>CodeList</h5>
                </div>
                <div className="sidebar-items" onClick={() => {navigate("/code")}}>
                    <FontAwesomeIcon icon="fa-solid fa-satellite-dish"  className="sidebar-icons-2"/>
                    <h5 style={{display: props.navbarVisibility.displaySidebar == true ? "block":"none" }}>Code</h5>
                </div>
            </div>
        </div>
    )
}

export default NavbarMain