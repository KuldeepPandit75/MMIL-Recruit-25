import React, { useState, useEffect } from "react";
import bg from "/assets/bg.jpg";
import mmil from "/assets/1000058712_f1beee89cb94ffdbc7b3a05cbdf6e5cc-30_9_2023, 1_42_36 pm 2.png";
import rocketImg from "/images/Vector-rocket.png";
import smokeImg from "/images/Frame 6.png";
import { Link, useNavigate } from "react-router-dom";
import "./Rocket.css";
import appbg from "/assets/bg-app.svg";

const Rocket = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleStartClick = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      const rocketElement = document.getElementById("rocket");
      const smokeElement = document.getElementById("smoke");

      rocketElement.classList.add("moveUp");
      smokeElement.classList.add("moveUp");

      setTimeout(() => {
        navigate("/Register");
      }, 2000); 
    }
  }, [isClicked, navigate]);

  return (
    <div style={{ position: "relative", overflow: "hidden", height:'100vh' }}>
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
          opacity: "1",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          width: "20rem",
          height: "16rem",
          display: 'flex',
          flexDirection:'column',
          alignItems:'center'
        }}
      >
        {isClicked && (
          <img src={rocketImg} id="rocket" className="" alt="Rocket" />
        )}
        {isClicked && (
          <img src={smokeImg} id="smoke" className="moveUp" alt="Smoke" />
        )}

        <h2
          style={{
            fontSize: "40px",
            fontFamily: "Montserrat",
            fontWeight:"ExtraBold",
            letterSpacing:"2px",
            height:"80px",
            marginTop:"20px",
            color: "white",
          }}
        >
          MMIL
        </h2>
        <p
          style={{
            display: "block",       
            fontSize: "18px",        
            letterSpacing:"3px",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight:"ExtraBold",
            marginTop: "-10px",
          }}
        >
          LET'S START
        </p>
        <button
          style={{
            fontWeight: "bold",
            backgroundColor: isHovering ? "#009A0F" : "#FFE454",
            height: "44px",
            width: "124px",
            border: "none",
            borderRadius: "10px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleStartClick}
        >
          <Link
            to="#"
            style={{
              textDecoration: "none",
              color: isHovering ? "#fff" : "#009A0F",
            }}
          >
            START
          </Link>
        </button>
        <img
          src={mmil}
          alt="Overlay"
          style={{
            position: "absolute",
            marginTop: "-20%",
            top: "-20%",
            left: "24%",
            width: "66%",
            height: "38%",
            objectFit: "cover",
            borderRadius: "10px",
            opacity: 1,
          }}
        />
      </div>
    </div>
  );
};

export default Rocket;
