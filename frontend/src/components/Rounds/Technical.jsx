import React, { useState, useEffect } from 'react'
import axios from 'axios';
import bg from "/assets/bg.jpg";
import appbg from "/assets/bg-app.jpg";
import './design.css';
import { Link } from "react-router-dom";
import mmil from "/assets/1000058712_f1beee89cb94ffdbc7b3a05cbdf6e5cc-30_9_2023, 1_42_36 pm 2.png";
import { useParams, useNavigate } from "react-router-dom"


const Technical = () => {
    const { userId } = useParams();
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [showNewElement, setShowNewElement] = useState(false);
    const url=import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/user/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);
    const handleTechnicalClick = async () => {
        // Navigate to the Technical page with userId

        try {
            const response = await axios.post(`${url}/login`, userData);
            if (response.status === 200) {
                const userId = response.data.userId; // Assuming the userId is returned in the response
                navigate(`/Design/${userId}`);
            } else {
                console.error("Login failed:", response.statusText);
            }
        } catch (error) {
            console.error("Login error:", error);

        }


    };
    const handleProgramingClick = async () => {
        // Navigate to the Technical page with userId

        try {
            const response = await axios.post(`${url}/login`, userData);
            if (response.status === 200) {
                const userId = response.data.userId; // Assuming the userId is returned in the response
                navigate(`/Programming/${userId}`);
            } else {
                console.error("Login failed:", response.statusText);
            }
        } catch (error) {
            console.error("Login error:", error);

        }


    };
    const handleWebDevClick = async () => {
        // Navigate to the Technical page with userId

        try {
            const response = await axios.post(`${url}/login`, userData);
            if (response.status === 200) {
                const userId = response.data.userId; // Assuming the userId is returned in the response
                navigate(`/Webdev/${userId}`);
            } else {
                console.error("Login failed:", response.statusText);
            }
        } catch (error) {
            console.error("Login error:", error);

        }


    };
    const handleAndroidClick = async () => {
        // Navigate to the Technical page with userId

        try {
            const response = await axios.post(`${url}/login`, userData);
            if (response.status === 200) {
                const userId = response.data.userId; // Assuming the userId is returned in the response
                navigate(`/Android/${userId}`);
            } else {
                console.error("Login failed:", response.statusText);
            }
        } catch (error) {
            console.error("Login error:", error);

        }


    };

    const handleClickProfile = () => {
        setShowNewElement(true);
    };



    const handleUnClickProfile = () => {
        setShowNewElement(false);
    };
    return (
        <div style={{textAlign:'center'}}>
            <div className='technical-main' style={{display:'flex'}}>
                <img
                    src={window.innerWidth <= 900 ? appbg : bg}
                    style={{
                        height: window.innerWidth < 900 ? "115vh" : "130vh",
                    }}
                    alt="Your Image"
                />
            </div>
            <div id='first'>
                <img
                    src={mmil}
                    alt="Overlay Image"
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "10px",
                    textAlign: "center",
                    letterSpacing: "0",
                    zIndex: "100"
                }}
            >
                {!showNewElement ? (
                    <button
                        onClick={handleClickProfile}
                        className="profile"
                        style={{
                            borderRadius: "50%",
                            backgroundColor: "#FFFAE7",
                            width: "50px",
                            height: "50px",
                            fontSize: "18px",
                            fontFamily: "Montserrat",
                        }}
                    >{userData ? userData.name.substring(0, 1).toUpperCase() : ''}</button>
                ) : (
                    <div
                        style={{
                            color: "#000",
                            backgroundColor: "#FFFAE7",
                            padding: "5px",
                            borderRadius: "14px",
                            width: "240px",
                        }}
                        className="profileCard"
                    >
                        <button
                            onClick={handleUnClickProfile}
                            className="profile"
                            style={{
                                color: "#000",
                                borderRadius: "50%",
                                backgroundColor: "#f9d6cd",
                                fontFamily: "Montserrat",
                                width: "50px",
                                height: "50px",
                                fontSize: "18px"
                            }}
                        >
                            {userData ? userData.name.substring(0, 1) : ''}
                        </button>
                        {userData && (
                            <>
                                <p style={{
                                    margin: "0",
                                    padding: "0",
                                    marginTop: "19px",
                                    fontSize: "14px",
                                    fontWeight: "bold"
                                }}>{userData.name}</p>
                                <hr
                                    style={{ padding: "0", margin: "0" }}
                                />
                                <p style={{
                                    margin: "0",
                                    padding: "0",
                                    marginTop: "6px",
                                }}
                                >{userData.email}</p>
                                <p style={{
                                    margin: "0",
                                    padding: "0",
                                    marginTop: "6px",
                                }}
                                >{userData.phoneNo}</p>
                                <p style={{
                                    margin: "0",
                                    padding: "4px",
                                    marginTop: "6px",
                                    backgroundColor: "#f9d6cd",
                                    objectFit: "cover",
                                    borderRadius: "24px",
                                }}
                                >{userData.domain}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className='domains'>
                <div className='fields'>
                    <ul>
                        <li className='design' onClick={handleTechnicalClick}>Design</li>
                        <li onClick={handleProgramingClick}>Programming</li>
                        <li onClick={handleWebDevClick}>Web Dev</li>
                        <li onClick={handleAndroidClick}>Android</li>
                    </ul>
                </div>
                <Link to={`/Registered/${userId}`}>
                    <i className="fa-solid fa-arrow-left backBtn"></i>
                </Link>
            </div>
            <div className='technical-container'>
                <div className='rounds' >
                    <p>Tasks</p>
                    <div className='instructions'>
                        <p>Round 2</p>
                        <h1 className='heading '> Technical Round</h1>
                        <h6 className='task'>Task round to check your skills</h6>
                        <h5>Instructions for Students</h5>
                        <ul>
                            <li>Pay attention to details and follow the instructions provided</li>
                            <li> Use this opportunity to showcase your skills and approach to problem-solving. </li>
                            <li>The students has to complete the task in before the deadline</li>
                            <li>Proceed to your particular domains from <br /> the Navbar for the tasks.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Technical