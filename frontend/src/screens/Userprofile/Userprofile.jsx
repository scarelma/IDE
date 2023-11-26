import React from "react";
import "../Userprofile/Userprofile.css"
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const Userprofile = () => {
    library.add(faCircleUser)
    const [displaySidebar, setDisplaySidebar] = useState(false)
    const [displayMenu, setDisplayMenu] = useState(false)
    const [profile, setProfile] = useState()

    const navigate = useNavigate()

    const fetchDetails = () => {
        api.get("/a/auth/profile",{
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}',
            },
        }).then(response => {
            if(response.status == 200){
                setProfile(response.data)
            }
        })
        // .catch(error => {
        //     navigate('/')
        // })
    }

    useEffect(() => {
        fetchDetails()
      }, []);
    return(
        <div style={{height:"100%", width: "calc(100% - 70px)"}}>
            <NavbarMain navbarVisibility = {{displaySidebar, setDisplaySidebar}} menuVisibility = {{displayMenu, setDisplayMenu}} />
            <div style={{height:"100%"}}>
                <div className="profile-cards">
                    <center>
                    <div className="profile-card-1">
                        <FontAwesomeIcon icon="fa-solid fa-circle-user"/>
                        {profile!= null ?<h5>{profile.full_name}</h5>:<></>}
                    </div>
                    </center>
                    <div className="profile-card-2">
                        {profile != null ?<table className="profile-table">
                            <tr>
                                <td><h5>Full name</h5></td>
                                <td>{profile.full_name}</td>
                            </tr>
                            <tr>
                                <td><h5>Email</h5></td>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <td><h5>Year</h5></td>
                                <td>{profile.year}</td>
                            </tr>
                            <tr>
                                <td><h5>Batch</h5></td>
                                <td>{profile.batch}</td>
                            </tr>
                            <tr>
                                <td><h5>Enrollment Number</h5></td>
                                <td>{profile.enrollment_number}</td>
                            </tr>
                            {/* <tr>
                                <td><h5>Organisation</h5></td>
                                <td>{profile.organisation}</td>
                            </tr> */}
                        </table>:<></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile