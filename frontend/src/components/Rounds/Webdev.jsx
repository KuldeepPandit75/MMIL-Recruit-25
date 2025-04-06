// frontend/Design.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from "/assets/bg.jpg";
import appbg from "/assets/bg-app.jpg";
import './design.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mmil from "/assets/1000058712_f1beee89cb94ffdbc7b3a05cbdf6e5cc-30_9_2023, 1_42_36 pm 2.png";

const Webdev = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const [phoneNo, setPhoneNo] = useState('');
  const [userData, setUserData] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [showNewElement, setShowNewElement] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleClickProfile = () => {
    setShowNewElement(true);
  };



  const handleUnClickProfile = () => {
    setShowNewElement(false);
  };

  const handleToast = () => {
    toast.success("Tasks submitted successfully");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: 'WebDev',
          phoneNo,
          githubLink,
          hostedSiteLink: websiteLink
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      console.log('Form submitted successfully');
      handleToast();
      setPhoneNo("");
      setGithubLink("");
      setWebsiteLink("");
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${url}/user/${userId}`, {
          headers: {
            Authorization: token
          }
        });
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
  return (
    <div className='main'>
      <div style={{ display: 'flex ' }}>
        <img
          src={window.innerWidth <= 900 ? appbg : bg}
          style={{
            height: window.innerWidth < 900 ? "149vh" : "170vh",
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
            <li className='web' onClick={handleWebDevClick}>Web Dev</li>
            <li onClick={handleAndroidClick}>Android</li>
          </ul>
          <Link to={`/Technical/${userId}`}>
            <i className="fa-solid fa-arrow-left backBtn"></i>
          </Link>
        </div>
      </div>
      <div className='container'>
        <div className='rounds'>
          <p>Tasks</p>
          <div className='webdev'>
            <p>Round 2</p>
            <h1 className='heading'>Web Development</h1>
            <h6 className='task'>Task round to check your skills</h6>
            <h5>Instructions for Students</h5>
            <ul>
              <li>You are required to clone the provided website present here in the figma link. <a target="_blank" href="https://www.figma.com/file/Zk8bE9zeyN9qI94IxSo1oX/MMIL-Web-Task?type=design&node-id=0%3A1&mode=design&t=U0Fr1ejGMmirLbjK-1"> here</a>. </li>
              <li> The task deadline is 3pm IST on 14-04-2024. </li>
              <li>The students has to complete the task before the deadline.</li>
              <li>Task should be submitted below.</li>
            </ul>
            <h5>Details to be filled by Students.</h5>
            <form onSubmit={handleSubmit}>
              <label htmlFor="phoneNo">Phone Number*</label>
              <div className='inputBox'>
                <input
                  id="phoneNo"
                  className="form"
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>
              <label htmlFor="githubLink">Github link*</label>
              <div className='inputBox'>
                <input
                  id="githubLink"
                  className="form"
                  type="text"
                  placeholder="Paste your Github link"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  required
                />
              </div>
              <label htmlFor="websiteLink">Website link (Netlify/Github)*</label>
              <div className='inputBox'>
                <input
                  id="websiteLink"
                  className="form"
                  type="text"
                  placeholder="Paste your website link"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </div>
              <button type="submit" className="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webdev;
