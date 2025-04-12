import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "/assets/bg.jpg";
import unstop from "/assets/unstop-logo 1.png";
import mmil from "/assets/mmil.png";
import appbg from "/assets/bg-app.svg";
import "../../Register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisteredPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [expandedCard, setExpandedCard] = useState(null);
  const [heightMainCard, setHeightMainCard] = useState("");
  const [positionMainTop, setPositionMainTop] = useState("50%");
  const [showNewElement, setShowNewElement] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleCardClick = (cardName) => {
    setExpandedCard(cardName === expandedCard ? null : cardName);
    setHeightMainCard(cardName === expandedCard ? "" : "36rem");
    setPositionMainTop(cardName === expandedCard ? "50%" : "60%");
  };

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleClickProfile = () => {
    setShowNewElement(true);
  };

  const handleUnClickProfile = () => {
    setShowNewElement(false);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const url = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${url}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleTechnicalClick = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${url}/login`, userData);
      if (response.status === 200) {
        const { userId, token } = response.data;
        console.log(userId);

        if (token) {
          localStorage.setItem("token", token);
        }

        navigate(`/technical/${userId}`);
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("User not registered! Register using a unique email id.");
      toast.error(error);
    }
  };

  const aptitudeRoundEnded = () => {
    toast.info("The Aptitude round has been ended!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const willBeginSoon = () => {
    toast.info("The technical round will begin soon", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

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
              height: windowSize.width < 900 ? "125vh" : "120vh",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "10px",
              textAlign: "center",
              letterSpacing: "0",
              zIndex: "100",
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
              >
                {userData ? userData.name.substring(0, 1).toUpperCase() : ""}
              </button>
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
                    fontSize: "18px",
                  }}
                >
                  {userData ? userData.name.substring(0, 1).toUpperCase() : ""}
                </button>
                {userData && (
                  <>
                    <p
                      style={{
                        margin: "0",
                        padding: "0",
                        marginTop: "19px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {userData.name}
                    </p>
                    <hr style={{ padding: "0", margin: "0" }} />
                    <p
                      style={{
                        margin: "0",
                        padding: "0",
                        marginTop: "6px",
                      }}
                    >
                      {userData.email}
                    </p>
                    <p
                      style={{
                        margin: "0",
                        padding: "0",
                        marginTop: "6px",
                      }}
                    >
                      {userData.phoneNo}
                    </p>
                    <p
                      style={{
                        margin: "0",
                        padding: "4px",
                        marginTop: "6px",
                        backgroundColor: "#f9d6cd",
                        objectFit: "cover",
                        borderRadius: "24px",
                      }}
                    >
                      {userData.domain}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to="/logout">
            <p
              className="fa-solid fa-arrow-right-from-bracket"
              title="Logout"
              style={{
                position: "absolute",
                top: "34px",
                left: "30px",
                fontSize: "20px",
                color: "white",
              }}
            ></p>
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
                  className="aptitude-expanded expanded-list"
                  style={{
                    display: expandedCard === "aptitude" ? "block" : "none",
                  }}
                >
                  <ul>
                    <li className="instructionsStudents">
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
                      <button
                        className="click"
                        style={{ cursor: "not-allowed" }}
                        onClick={aptitudeRoundEnded}
                      >
                        {/* <a href="https://unstop.com/o/4Uy2Z7I?utm_medium=Share&utm_source=shortUrl"> */}
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
                style={{ position: "absolute", right: "34px" }}
              ></i>
            </div>

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
                  className="technical-expanded expanded-list"
                  style={{
                    display: expandedCard === "technical" ? "block" : "none",
                  }}
                >
                  <ul>
                    <li className="instructionsStudents">
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
                      <button
                        className="click"
                        // onClick={handleTechnicalClick}
                        onClick={willBeginSoon}
                        style={{ color: "black", cursor: "pointer" }}
                      >
                        {/* <Link to="/Technical"> */}
                        Click here
                        {/* </Link> */}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <i
                className={`fa-solid fa-chevron-${
                  expandedCard === "technical" ? "down" : "right"
                }`}
                style={{ position: "absolute", right: "34px" }}
              ></i>
            </div>

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
                  className="interview-expanded expanded-list"
                  style={{
                    display: expandedCard === "interview" ? "block" : "none",
                  }}
                >
                  <ul>
                    <li className="instructionsStudents">
                      Instruction for Students
                    </li>
                    <li>
                      Your interview is scheduled for [Date Yet to <br />{" "}
                      announce] at [Time Yet to announce]. Please <br /> ensure
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
                style={{ position: "absolute", right: "34px" }}
              ></i>
            </div>
          </div>
          <img src={mmil} alt="Overlay Image" className="mmil-logo" />
        </div>
      </div>
    </>
  );
};

export default RegisteredPage;
