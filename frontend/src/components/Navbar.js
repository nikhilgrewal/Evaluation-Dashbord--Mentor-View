import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import Allstudents from "./Allstudents";
import Assignedstudents from "./Assignedstudents";
import '../css/navbar.css';
import { MentorDetails } from "../App";

function Navbar(){
    const {mentorData, handleChange} = useContext(MentorDetails);
    console.log(mentorData)
    return(
            <div>
            <nav className="navbar">
                <Link to="/">All Students</Link>
                <Link to="/assignedstudents">Assigned Students</Link>
                {mentorData.ismentorSet ? <h1> Mentor Name: {mentorData["mentorid"]}</h1>:
                <div>
                    <input placeholder="Enter Mentor Name" onChange={(e) => handleChange("mentorid", e.target.value)}/>
                <button onClick={(e) => handleChange("ismentorSet", true)}>Submit</button>
                </div>}
            </nav>
        </div>
    );
}

export default Navbar;