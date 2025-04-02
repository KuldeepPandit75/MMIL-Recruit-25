import React, { useState, useEffect } from "react";
import bg from "/assets/bg.jpg";
import vector from "/assets/Vector (1).png";
import unstop from "/assets/unstop-logo 1.png";
import mmil from "/assets/mmil.png";
import { Link } from "react-router-dom";
import appbg from "/assets/bg-app.svg";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const Register = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [expandedCard, setExpandedCard] = useState(null);
  const [heightMainCard, setHeightMainCard] = useState("");
  const [positionTop, setPositionTop] = useState("83%");
  const [direction, setDirection] = useState("right");
  const [positionMainTop, setPositionMainTop] = useState("50%");

  const handleCardClick = (cardName) => {
    setExpandedCard(cardName === expandedCard ? null : cardName);
    setHeightMainCard(cardName === expandedCard ? "" : "36rem");
    setPositionTop(cardName === expandedCard ? "88%" : "105%");
    setDirection(cardName === expandedCard ? "right" : "down");
    setPositionMainTop(cardName === expandedCard ? "50%" : "60%");
  };

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const closeRegToast = () => {
    toast.info("Registerations are closed now!");
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <>
      <div>
        <div className="contain">
          <img
            src={windowSize.width <= 900 ? appbg : bg}
            alt="Your Image"
            id="imagess"
            style={{
              width: windowSize.width < 900 ? "100vw" : "100vw",
              height: windowSize.width < 900 ? "125vh" : "129vh",
              objectFit: "cover",
            }}
          />
          <Link
            className="loginBtn"
            to="/Login"
          >
            Login
          </Link>
          <div
            className="card"
            style={{
              height: heightMainCard,
              top: positionMainTop,
            }}
          >
            <h2
              style={{
                fontFamily: "Montserrat",
                textAlign: "center",
                color: "white",
                fontWeight: "ExtraBold",
                letterSpacing: "0",
              }}
            >
              Rounds
            </h2>
            <div
              className={`aptitude sub-card ${
                expandedCard === "aptitude" ? "expanded-aptitude" : ""
              }`}
              onClick={() => handleCardClick("aptitude")}
            >
              <div>
                <p className="roundNo">Round 1</p>
                <p className="roundName">Aptitude Round</p>
                <p className="roundDescription">
                  Technical and Logical based MCQs round.
                </p>
                <div
                  class="aptitude-expanded expanded-list"
                  style={{
                    display: expandedCard === "aptitude" ? "block" : "none",
                  }}
                >
                  <ul>
                    <li class="instructionsStudents">
                      Instruction for Students
                    </li>
                    <li>The students has to go to unstop.com. </li>
                    <li>
                      Only the registered student's result will <br /> be
                      evaluated.
                    </li>
                    <li>
                      The student has to submit the test in <br /> the given
                      time.
                    </li>
                    <li>The link to the task has been provided below.</li>
                    <li style={{ listStyle: "none" }}>
                      {" "}
                      <img
                        src={unstop}
                        alt=""
                        style={{ margin: "10px", height: "30px" }}
                      ></img>{" "}
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <button className="click" style={{cursor: "not-allowed"}}>
                        {/* <a href=""> */}
                          Click here
                          {/* </a> */}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <i
                className={`fa-solid fa-chevron-${
                  expandedCard === "aptitude" ? "down" : "right"
                }`}
                style={{ position: "absolute", right: "60px" }}
              ></i>
            </div>
            {/* <Link to="/Technical" className="card-link"> */}
              <div
                className={`technical sub-card ${
                  expandedCard === "technical" ? "expanded-technical" : ""
                }`}
                onClick={() => handleCardClick("technical")}
              >
                <div>
                  <p className="roundNo">Round 2</p>
                  <p className="roundName">Technical Round</p>
                  <p className="roundDescription">
                    Task round to check your skills.
                  </p>
                  <div
                    class="technical-expanded expanded-list"
                    style={{
                      display: expandedCard === "technical" ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li class="instructionsStudents">
                        Instruction for Students
                      </li>
                      <li>
                        {" "}
                        Pay attention to details and follow the <br />{" "}
                        instructions provided.
                      </li>
                      <li>
                        {" "}
                        Use this opportunity to showcase your <br /> skills and
                        approach to problem-solving.
                      </li>
                      <li>
                        {" "}
                        The students has to complete the task <br /> before the
                        deadline.
                      </li>
                      <li>The link to the task has been provided below.</li>
                      <li style={{ listStyle: "none" }}>
                        <button className="click" style={{cursor: "not-allowed"}}>
                          {/* <a href="/Technical"> */}
                            Click here
                            {/* </a> */}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <i
                  className={`fa-solid fa-chevron-${
                    expandedCard === "technical" ? "down" : "right"
                  }`}
                  style={{ position: "absolute", right: "60px" }}
                ></i>
              </div>
            {/* </Link> */}
            <div
              className={`interview sub-card ${
                expandedCard === "interview" ? "expanded-interview" : ""
              }`}
              onClick={() => handleCardClick("interview")}
            >
              <div>
                <p className="roundNo">Round 3</p>
                <p className="roundName">HR Round</p>
                <p className="roundDescription">
                  Personal interview and HR interview round <br /> to check your
                  personality and coordination skills.
                </p>
                <div
                  class="interview-expanded expanded-list"
                  style={{
                    display: expandedCard === "interview" ? "block" : "none",
                  }}
                >
                  <ul>
                    <li class="instructionsStudents">
                      Instruction for Students
                    </li>
                    <li>
                      Your interview is scheduled for 15th of <br />{" "}
                      April at [Time Yet to announce]. Please <br /> ensure
                      you are available at least <br /> 10 minutes before the
                      scheduled time.
                    </li>
                    <li>
                      Interviewer will focus on different aspects of <br /> your
                      skills and experience.{" "}
                    </li>
                    <li>
                      Be ready to discuss specific examples from <br /> your
                      past experience that demonstrate your <br /> skills,
                      problem-solving abilities, and teamwork.
                    </li>
                    <li>
                      Please have a copy of your resume for <br /> reference.
                    </li>
                  </ul>
                </div>
              </div>
              <i
                className={`fa-solid fa-chevron-${
                  expandedCard === "interview" ? "down" : "right"
                }`}
                style={{ position: "absolute", right: "60px" }}
              ></i>
            </div>
          </div>
          <img src={mmil} alt="Overlay Image" className="mmil-logo" />

          {/* <Link to="" onClick={closeRegToast} className="link" style={{ top: positionTop }}>
            Register Now
          </Link> */}
          
          <Link to="/First" className="link" style={{ top: positionTop }}>
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
