import React, { useEffect,useRef  } from "react";
import '../HomeTopSection/HomeTopSection.css'
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope,faPhone} from "@fortawesome/free-solid-svg-icons";
import iotImage from "./../../assets/images/iot.png"
import analyticsCard from "./../../assets/images/analytics-card.png"
import sensor from "./../../assets/images/sensors.png"
import shape from "./../../assets/images/bg2.png"
import shape2 from './../../assets/images/mobile_bg.png'
import analyticsImage from './../../assets/images/analytcs2.png'
import featureImage from './../../assets/images/screenshot.jpg'
// import Zoom from 'react-reveal/Zoom'
import ParticlesEffect from "../Particles/ParticleEffect";
import { useState } from "react";


const HomeTopSection = () => { 
    library.add(faEnvelope, faPhone);
    const [mobileNav, setMobileNav] = useState(false)
    
    return(
        <div className="wrapper" id="wrapper">
            <Navbar menuData = {{mobileNav,setMobileNav}}/>
            <section className="section-1">
                <ParticlesEffect />
                <div className="home-top-section">
                    <div className="intro-text">
                        <p>Integrated</p>
                        <p>Development Environment</p>
                    </div>

                </div>

                <div className="mobile-nav" style={{display: mobileNav == true ? "block" : "none"}}>
                    <Link>About</Link><br/>
                    <Link to="/auth">Signup</Link><br/>
                    <Link to="/auth">Login</Link>
                </div>
            </section>
        </div>

    )
}

export default HomeTopSection