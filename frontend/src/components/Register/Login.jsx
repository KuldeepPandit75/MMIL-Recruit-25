import React, { useState } from "react";
import mmil from "/assets/mmil.png";
import bg from "/assets/bg.jpg";
import appbg from "/assets/bg-app.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userData, setUserData] = useState({
    phoneNo: "",
    email: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://recruit-mmil-4.onrender.com/login", userData);
      if (response.status === 200) {
        const userId = response.data.userId; // Assuming the userId is returned in the response
        history(`/registered/${userId}`);
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("User not registered! Register using a unique email id.");
      toast.error(error);
    }
  };
  
  return (
    <div style={{ position: "relative", overflow:'hidden', display:'flex' }}>
      <img
        src={windowSize.width <= 900 ? appbg : bg}
        alt="Your Image"
        style={{
          width: windowSize.width < 900 ? "100vw" : "100vw",
          height: windowSize.width < 900 ? "100vh" : "100vh",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "linear-gradient(to right, #666666,#4d4d4d, #262626, #1a1a1a, #0d0d0d)",
          padding: "10px",
          paddingTop: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          width: "23rem",
          height: "19rem",
          // display:'flex',
          // flexDirection:'column',
          // alignItems:'center',
          textAlign:'center'
        }}
      >
        {/* Your card content goes here */}
        <p
          style={{
            fontSize: "44px",
            fontFamily: "Montserrat",
            fontWeight: "ExtraBold",
            letterSpacing: "2px",
            height: "80px",
            marginTop: "16px",
            marginBottom:'20px',
            color: "white",
          }}
        >
          Login
        </p>
        <form onSubmit={handleSubmit}>
          <p
            style={{
              display: "block",
              marginLeft: "8px",
              fontSize: "18px",
              letterSpacing: "1px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "ExtraBold",
              marginTop: "-10px",
            }}
          >
            Phone Number
          </p>

          <div
            style={{
              border: "1px solid #FFE454",
              borderRadius: "12px",
              padding: "6px",
              width: "66%",
              margin: "auto",
              marginTop: "-10px",
            }}
          >
            <input
              className="form"
              style={{
                width: "90%",
                border: "none",
                background: "none",
                borderBottom: "1px solid #FFE454",
                padding: "6px",
                color: "white",
                outline: "none",
                fontSize:"16px",
                height:'1.5rem',
                textAlign:'center'
              }}
              type="tel"
              name="phoneNo"
              placeholder="Enter your phoneNo number"
              value={userData.phoneNo}
              onChange={handleChange}
            />
          </div>

          <p
            style={{
              display: "block",
              marginLeft: "8px",
              fontSize: "18px",
              letterSpacing: "1px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: "ExtraBold",
              marginTop: "20px",
            }}
          >
            Email
          </p>

          <div
            style={{
              border: "1px solid #FFE454",
              borderRadius: "12px",
              padding: "6px",
              width: "66%",
              margin: "auto",
              marginTop: "-10px",
            }}
          >
            <input
              className="form"
              style={{
                width: "90%",
                border: "none",
                background: "none",
                borderBottom: "1px solid #FFE454",
                padding: "6px",
                color: "white",
                outline: "none",
                fontSize:'16px',
                height:'1.5rem',
                textAlign:'center'
              }}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

         
          <button
          class= "loginPageBtn"
            type="submit"
          >
            Login
          </button>
          <a
            href="/Register"
            // onClick={closeRegToast}
            style={{
              display: "block",
              textDecoration: "underline",
              color: "white",
              padding: "10px",
              opacity: "0.5",
              fontFamily: "Montserrat",
              letterSpacing: "0",
            }}
          >
            Register
          </a>
        </form>
        <img
          src={mmil}
          alt="Overlay Image"
          style={{
            position: "absolute",
            marginTop: "-14%",
            top: "-20%",
            left: "30%",
            width: "40%",
            height: "32%",
            opacity: "1",
          }}
        />
      </div>
    </div>
  );
};

export default Login;