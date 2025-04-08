import React, { useEffect, useState } from "react";
import mmil from "/assets/1000058712_f1beee89cb94ffdbc7b3a05cbdf6e5cc-30_9_2023, 1_42_36 pm 2.png";
import bg from "/assets/bg.jpg";
import appbg from "/assets/bg-app.svg";
import { toast } from "react-toastify";
import "./Resume.css";
import astronomer from "/assets/cute-astronaut-waving-hand-to-show-peace-symbol-cartoon-icon-illustration-vector 1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  let initialData = {
    year: "",
    name: "",
    rollNo: null,
    branch: "",
    email: "",
    phoneNo: null,
    domain: "",
  };

  const [detBox, setDetBox] = useState("Year");
  const [details, setDetails] = useState(initialData);
  const navigate = useNavigate();

  // const { userData, setUserData } = useState();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [tickmark, showTickmark] = useState(false);
  const [isHoverTickmark, setHoverTickmark] = useState(false);

  const handleHoverTickmark = () => {
    setHoverTickmark(true);
  };
  const handleUnHoverTickmark = () => {
    setHoverTickmark(false);
  };

  const [isActive1, setIsActive1] = useState(false);

  function handleActive1() {
    setIsActive1(true);
    setIsActive2(false);
    setDetails((prev) => ({
      ...prev,
      year: "1st year",
    }));
    showTickmark(true);
  }

  const [isActive2, setIsActive2] = useState(false);

  function handleActive2() {
    setIsActive2(true);
    setIsActive1(false);
    setDetails((prev) => ({
      ...prev,
      year: "2nd year",
    }));
    showTickmark(true);
  }

  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovering1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovering1(false);
  };
  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  };

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const fileUpload = async (data) => {
    if (file) {

      const url = import.meta.env.VITE_BACKEND_URL;
      try {
        let formData = new FormData();
        formData.append("resume", file);
        formData.append("user", data.user);
        const response = await axios.post(`${url}/upload-resume`, formData, {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        });
        return true
      } catch (error) {
        await axios.post(`${url}/delete/${data.user._id}`)
        return false
      }
    }
  }

  const handleTickClick = async () => {
    if (detBox === "Year") {
      setDetBox("Name");
      showTickmark(false);
    } else if (detBox === "Name") {
      setDetBox("RollNo");
      showTickmark(false);
    } else if (detBox === "RollNo") {
      setDetBox("Branch");
      showTickmark(false);
    } else if (detBox === "Branch") {
      setDetBox("Email");
      showTickmark(false);
    } else if (detBox === "Email") {
      setDetBox("PhoneNo");
      showTickmark(false);
    } else if (detBox === "PhoneNo") {
      setDetBox("Domain");
      showTickmark(false);
      console.log("After PhoneNo →", details);
    } else if (detBox === "Domain" && details.year === "2nd year") {
      setDetBox("Resume");
      showTickmark(false);
    } else {
      // Final submission

      const url = import.meta.env.VITE_BACKEND_URL;

      const requiredFields = [
        "year",
        "name",
        "rollNo",
        "branch",
        "email",
        "phoneNo",
        "domain",
      ];

      const hasEmptyField = requiredFields.some(
        (field) => !details[field]?.trim()
      );

      if (hasEmptyField) {
        toast.error("Please fill all the fields before submitting.");
        return;
      }

      console.log("Submitting Details:", details);

      try {
        showTickmark(false)

        let a=toast.loading('Registration In process!')

        const response = await axios.post(
          `${url}/name`,
          {
            ...details,
            formType: "MMIL",
          }
        );
        const data = response.data;


        if (details.year == "2nd year") {

          const fileUploadResponse = await fileUpload(data);
          if (!fileUploadResponse) {
            toast.error(data.error || "File Upload Failed!");
            return;
          }
        }

        if (response.status !== 201) {
          toast.error(data.error || "Something went wrong");
          return;
        }

        const userId = data.user._id;


        if (data.token) {
          localStorage.setItem("token", `Bearer ${data.token}`);
        }
        toast.done(a)
        toast.success("Registration Successful!");
        setDetBox("Congrats");

        setTimeout(() => {
          navigate(`/registered/${userId}`);
        }, 2000);
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Server error. Please try again later.");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  // Name Field Functions

  const [formValid, setFormValid] = useState(false);
  let newName;

  const handleNameChange = (e) => {
    newName = e.target.value;

    setDetails((prev) => ({
      ...prev,
      name: newName,
    }));

    if (newName.length >= 2) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    if (formValid) {
      showTickmark(true);
    } else {
      showTickmark(false);
    }
  }, [formValid]);

  // Roll No. Field

  let newRollNo;

  const handleRollChange = (e) => {
    newRollNo = e.target.value;
    setDetails((prev) => ({
      ...prev,
      rollNo: newRollNo,
    }));
    if (newRollNo.length >= 5) {
      setFormValid(true);
    } else if (newRollNo.trim() === "") {
      setFormValid(false);
      toast.error("RollNo cannot be empty");
    } else {
      setFormValid(false);
    }
  };

  // Branch Field

  let newBranch;

  const handleBranchChange = (e) => {
    newBranch = e.target.value;
    setDetails((prev) => ({
      ...prev,
      branch: newBranch,
    }));

    if (newBranch.length >= 2) {
      setFormValid(true);
    } else if (newBranch.trim() === "") {
      setFormValid(false);
      toast.error("Branch cannot be empty");
    } else {
      setFormValid(false);
    }
  };

  // Email Field

  let newEmail;

  const handleEmailChange = (e) => {
    newEmail = e.target.value;

    setDetails((prev) => ({
      ...prev,
      email: newEmail,
    }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newEmail.trim() === "") {
      setFormValid(false);
      if (!toast.isActive("emptyEmailToast")) {
        toast.error("Email cannot be empty", { toastId: "emptyEmailToast" });
      }
      if (toast.isActive("invalidEmailToast")) {
        toast.dismiss("invalidEmailToast");
      }
    } else if (emailRegex.test(newEmail)) {
      setFormValid(true);
      toast.dismiss("emptyEmailToast");
      if (toast.isActive("invalidEmailToast")) {
        toast.dismiss("invalidEmailToast");
      }
    } else {
      setFormValid(false);
      if (!toast.isActive("invalidEmailToast")) {
        toast.error("Invalid Email", { toastId: "invalidEmailToast" });
      }
      if (toast.isActive("emptyEmailToast")) {
        toast.dismiss("emptyEmailToast");
      }
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNo = e.target.value;

    setDetails((prev) => ({
      ...prev,
      phoneNo: phoneNo,
    }));

    if (/^\d{10}$/.test(phoneNo)) {
      setFormValid(true);
      toast.dismiss("Toast");
    } else {
      setFormValid(false);
      if (!toast.isActive("Toast")) {
        toast.error("Phone number must contain exactly 10 digits", {
          toastId: "Toast",
        });
      }
    }
  };

  // Domain Field

  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);

  const handleActive3 = () => {
    setIsActive3(true);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setDetails((prev) => ({
      ...prev,
      domain: "Design",
    }));
    showTickmark(true);
  };

  const handleActive4 = () => {
    setIsActive4(true);
    setIsActive3(false);
    setIsActive5(false);
    setIsActive6(false);
    setDetails((prev) => ({
      ...prev,
      domain: "programming",
    }));
    showTickmark(true);
  };

  const handleActive5 = () => {
    setIsActive5(true);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive6(false);
    setDetails((prev) => ({
      ...prev,
      domain: "web-dev",
    }));
    showTickmark(true);
  };

  const handleActive6 = () => {
    setIsActive6(true);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setDetails((prev) => ({
      ...prev,
      domain: "android",
    }));
    showTickmark(true);
  };

  const [isHovering3, setIsHovering3] = useState(false);
  const [isHovering4, setIsHovering4] = useState(false);
  const [isHovering5, setIsHovering5] = useState(false);
  const [isHovering6, setIsHovering6] = useState(false);

  const handleMouseEnter3 = () => {
    setIsHovering3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovering3(false);
  };

  const handleMouseEnter4 = () => {
    setIsHovering4(true);
  };

  const handleMouseLeave4 = () => {
    setIsHovering4(false);
  };

  const handleMouseEnter5 = () => {
    setIsHovering5(true);
  };

  const handleMouseLeave5 = () => {
    setIsHovering5(false);
  };

  const handleMouseEnter6 = () => {
    setIsHovering6(true);
  };

  const handleMouseLeave6 = () => {
    setIsHovering6(false);
  };

  // Resume Field

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    showTickmark(true);

    // Create a URL to show the image preview
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreview(fileUrl);
  };

  return (
    <>
      <div
        style={{ position: "relative", display: "flex", textAlign: "center" }}
      >
        <img
          src={windowSize.width <= 900 ? appbg : bg}
          alt="Your Image"
          style={{
            width: windowSize.width < 900 ? "100vw" : "100vw", // Adjust as needed
            height: windowSize.width < 900 ? "100vh" : "100vh", // Adjust as needed
             // Adjust as needed
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
            paddingTop: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            width: "23rem",
            height:
              detBox == "Domain" || detBox == "Resume"
                ? "27rem"
                : detBox == "Congrats"
                  ? "23rem"
                  : "18.5rem",
          }}
        >
          {/* Your card content goes here */}
          {detBox == "Year" ? (
            <>
              <p
                style={{
                  fontSize: "40px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "20px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
              <p
                style={{
                  display: "block",
                  fontSize: "18px",
                  letterSpacing: "3px",
                  color: "white",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  marginTop: "-20px",
                }}
              >
                Choose your year?
              </p>

              <div style={{ display: "flex" }}>
                <div
                  className="btn"
                  style={{
                    border: "2px solid #FFE454",
                    borderRadius: "17px",
                    backgroundColor:
                      isHovering1 || isActive1 ? "#1a1a1a" : "#FFE454",
                    color: isHovering1 || isActive1 ? "#FFE454" : "#1a1a1a",
                    fontWeight: "bold",
                    marginLeft: "68px",
                    width: "70px",
                    fontFamily: "Montserrat",
                    fontWieght: "Bold",
                    padding: "5px 5px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnter1}
                  onMouseLeave={handleMouseLeave1}
                  onClick={handleActive1}
                >
                  1st
                </div>
                <div
                  className="btn"
                  style={{
                    border: "2px solid #FFE454",
                    borderRadius: "17px",
                    backgroundColor:
                      isHovering2 || isActive2 ? "#1a1a1a" : "#FFE454",
                    color: isHovering2 || isActive2 ? "#FFE454" : "#1a1a1a",
                    fontWeight: "bold",
                    marginLeft: "80px",
                    width: "70px",
                    fontFamily: "Montserrat",
                    fontWieght: "Bold",
                    padding: "5px 5px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                  onClick={handleActive2}
                >
                  2nd
                </div>
              </div>
              <div
                onClick={handleTickClick}
                style={{
                  marginLeft: "0%",
                  marginTop: "18px",
                  display: tickmark ? "inline-block" : "none",
                }}
              >
                <p
                  className="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    marginTop: "20px",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>
              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-16%",
                  top: "-15%",
                  left: "30%",
                  width: "50%",
                  height: "34%",
                  borderRadius: "10px",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "Name" ? (
            <>
              <p
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
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
                What is your name ?
              </p>
              <div
                style={{
                  border: "1px solid #FFE454",
                  borderRadius: "12px",
                  padding: "6px",
                  width: "60%",
                  margin: "auto",
                  marginTop: "8px",
                }}
              >
                <input
                  className="form"
                  formMethod="POST"
                  style={{
                    width: "90%",
                    border: "none",
                    background: "none",
                    borderBottom: "1px solid #FFE454",
                    padding: "6px",
                    color: "white",
                    outline: "none",
                    textAlign: "center",
                  }}
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    handleNameChange(e);
                  }}
                  placeholder="Enter Your Name Here"
                  aria-label="type here"
                />
              </div>
              <div onClick={handleTickClick}>
                <i
                  className="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    display: tickmark ? "inline-block" : "none",
                    marginLeft: "auto",
                    marginTop: "24px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => handleHoverTickmark(true)}
                  onMouseLeave={() => handleUnHoverTickmark(false)}
                ></i>
              </div>
              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-20%",
                  top: "-20%",
                  left: "30%",
                  width: "46%",
                  height: "35%",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "RollNo" ? (
            <>
              <p
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
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
                What's your University RollNo ?{" "}
              </p>

              <div
                style={{
                  border: "1px solid #FFE454",
                  borderRadius: "12px",
                  padding: "6px",
                  width: "66%",
                  margin: "auto",
                  marginTop: "8px",
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
                    textAlign: "center",
                  }}
                  type="text"
                  value={newRollNo}
                  onChange={(e) => {
                    handleRollChange(e);
                  }}
                  placeholder="Text here"
                  aria-label="type here"
                />
              </div>

              <div onClick={handleTickClick}>
                <p
                  className="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    marginLeft: "auto",
                    marginTop: "24px",
                    display: tickmark ? "inline-block" : "none",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>

              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-20%",
                  top: "-20%",
                  left: "30%",
                  width: "46%",
                  height: "35%",
                  opacity: "1",
                }}
              />
            </>
          ) : null}
          {detBox == "Branch" ? (
            <>
              <p
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
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
                What is your branch ?
              </p>

              <div
                style={{
                  border: "1px solid #FFE454",
                  borderRadius: "12px",
                  padding: "6px",
                  width: "69%",
                  margin: "auto",
                  marginTop: "8px",
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
                    textAlign: "center",
                  }}
                  type="text"
                  value={newBranch}
                  onChange={(e) => {
                    handleBranchChange(e);
                  }}
                  placeholder="Text here"
                  aria-label="type here"
                />
              </div>

              <div onClick={handleTickClick}>
                <p
                  className="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    marginLeft: "auto",
                    marginTop: "24px",
                    display: tickmark ? "inline-block" : "none",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>

              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-20%",
                  top: "-20%",
                  left: "30%",
                  width: "46%",
                  height: "35%",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "Email" ? (
            <>
              <p
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
              <p
                style={{
                  display: "block",
                  marginLeft: "20px",

                  fontSize: "18px",

                  letterSpacing: "1px",
                  color: "white",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  marginTop: "-10px",
                }}
              >
                What is your email id ?
              </p>
              <div
                style={{
                  border: "1px solid #FFE454",
                  borderRadius: "12px",
                  padding: "6px",
                  width: "70%",
                  marginLeft: "55px",
                  marginTop: "8px",
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
                    textAlign: "center",
                  }}
                  type="email"
                  value={newEmail}
                  onChange={(e) => {
                    handleEmailChange(e);
                  }}
                  placeholder="Text here"
                  aria-label="type here"
                />
              </div>
              <div onClick={handleTickClick}>
                <p
                  className="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    marginLeft: "auto",
                    marginTop: "24px",
                    display: tickmark ? "inline-block" : "none",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>

              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-20%",
                  top: "-20%",
                  left: "30%",
                  width: "46%",
                  height: "35%",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "PhoneNo" ? (
            <>
              <p
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
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
                What is your Phone No. ?
              </p>
              <div
                style={{
                  border: "1px solid #FFE454",
                  borderRadius: "12px",
                  padding: "6px",
                  width: "75%",
                  marginLeft: "50px",
                  marginTop: "8px",
                }}
              >
                <input
                  className="form"
                  formMethod="POST"
                  style={{
                    width: "90%",
                    border: "none",
                    background: "none",
                    borderBottom: "1px solid #FFE454",
                    padding: "6px",
                    color: "white",
                    outline: "none",
                    textAlign: "center",
                  }}
                  type="text"
                  value={details.phoneNo || ""}
                  onChange={(e) => {
                    handlePhoneChange(e);
                  }}
                  placeholder="Text here"
                  aria-label="type here"
                />
              </div>
              <div onClick={handleTickClick}>
                <p
                  className="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    marginLeft: "auto",
                    marginTop: "24px",
                    display: tickmark ? "inline-block" : "none",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>
              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-20%",
                  top: "-20%",
                  left: "30%",
                  width: "46%",
                  height: "35%",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "Domain" ? (
            <>
              <p
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Let's BEGIN!
              </p>
              <p
                style={{
                  display: "block",
                  fontSize: "24px",
                  color: "white",
                  fontFamily: "Montserrat",
                  marginTop: "-2rem",
                }}
              >
                Choose your domain ?
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="btn"
                  style={{
                    border: "2px solid #FFE454",
                    backgroundColor:
                      isHovering3 || isActive3 ? "#1a1a1a" : "#FFE454",
                    color: isHovering3 || isActive3 ? "#FFE454" : "#1a1a1a",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                  onMouseEnter={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                  onClick={handleActive3}
                >
                  Design
                </div>
                <br />
                <div
                  className="btn"
                  style={{
                    border: "2px solid #FFE454",
                    backgroundColor:
                      isHovering4 || isActive4 ? "#1a1a1a" : "#FFE454",
                    color: isHovering4 || isActive4 ? "#FFE454" : "#1a1a1a",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                  onMouseEnter={handleMouseEnter4}
                  onMouseLeave={handleMouseLeave4}
                  onClick={handleActive4}
                >
                  Programming
                </div>
                <br />
                <div
                  className="btn"
                  style={{
                    border: "2px solid #FFE454",
                    backgroundColor:
                      isHovering5 || isActive5 ? "#1a1a1a" : "#FFE454",
                    color: isHovering5 || isActive5 ? "#FFE454" : "#1a1a1a",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                  onMouseEnter={handleMouseEnter5}
                  onMouseLeave={handleMouseLeave5}
                  onClick={handleActive5}
                >
                  Web-Dev
                </div>
                <br />
                <div
                  className="btn"
                  style={{
                    border: "2px solid #FFE454",
                    backgroundColor:
                      isHovering6 || isActive6 ? "#1a1a1a" : "#FFE454",
                    color: isHovering6 || isActive6 ? "#FFE454" : "#1a1a1a",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    //   width: "80px",
                  }}
                  onMouseEnter={handleMouseEnter6}
                  onMouseLeave={handleMouseLeave6}
                  onClick={handleActive6}
                >
                  Android-Dev
                </div>
              </div>

              <div
                onClick={handleTickClick}
                style={{
                  marginLeft: "0%",
                  marginTop: "-50px",
                  display: tickmark ? "inline-block" : "none",
                }}
              >
                <p
                  class="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>

              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-24%",
                  // marginBottom: "15%",
                  top: "-2%",
                  left: "30%",
                  width: "42%",
                  height: "20%",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "Resume" ? (
            <>
              <h2
                style={{
                  fontSize: "44px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                  marginBottom: "-20px",
                }}
              >
                LET'S BEGIN
              </h2>
              <p
                style={{
                  display: "block",
                  marginLeft: "8px",
                  fontSize: "18px",
                  letterSpacing: "1px",
                  color: "white",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  marginTop: "12px",
                }}
              >
                Please upload your Resume!
              </p>

              <div className="dropzone">
                <p
                  class="fa-regular fa-file-lines"
                  style={{ fontSize: "44px", margin: "15px", color: "white" }}
                ></p>
                <div>
                  <input
                    accept=".pdf"
                    style={{ display: "none" }}
                    id="upload-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="upload-file"
                    style={{
                      color: "#02CA46",
                      textDecoration: "underline",
                      cursor: "pointer",
                      display: "inline",
                    }}
                  >
                    Click here
                  </label>{" "}
                  <span style={{ color: "white" }}> to upload</span>
                </div>
                {preview && (
                  <a
                    href={preview}
                    target="_blank"
                    style={{
                      color: "#9FC2CC",
                      marginTop: "10px",
                    }}
                  >
                    File Preview
                  </a>
                )}
                {file && (
                  <p style={{ color: "white" }}>Selected file: {file.name}</p>
                )}
              </div>

              <div onClick={handleTickClick}>
                <p
                  class="fa-solid fa-circle-check"
                  style={{
                    color: isHoverTickmark ? "#ffffff" : "#FFE454",
                    fontSize: "4.2rem",
                    marginLeft: "auto",
                    marginTop: "24px",
                    display: tickmark ? "inline-block" : "none",
                  }}
                  onMouseEnter={handleHoverTickmark}
                  onMouseLeave={handleUnHoverTickmark}
                ></p>
              </div>
              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-24%",
                  // marginBottom: "15%",
                  top: "-2%",
                  left: "30%",
                  width: "42%",
                  height: "20%",
                  opacity: 1,
                }}
              />
            </>
          ) : null}
          {detBox == "Congrats" ? (
            <>
              <p
                style={{
                  fontSize: "30px",
                  fontFamily: "Montserrat",
                  fontWeight: "ExtraBold",
                  letterSpacing: "2px",
                  height: "80px",
                  marginTop: "16px",
                  color: "white",
                }}
              >
                Congratulations!
              </p>
              <img
                src={astronomer}
                alt=""
                style={{
                  height: "180px",
                  marginTop: "-48px",
                  marginLeft: "auto",
                  marginBottom: "12px",
                }}
              />
              <p
                style={{
                  display: "block",
                  marginTop: "-20px",
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Montserrat",
                }}
              >
                You have registered successfully!
              </p>

              <img
                src={mmil}
                alt="Overlay Image"
                style={{
                  position: "absolute",
                  marginTop: "-20%",
                  top: "-12%",
                  left: "30%",
                  width: "42%",
                  height: "27%",
                  opacity: 0.9,
                }}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Register;
