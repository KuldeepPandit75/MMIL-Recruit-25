const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const authMiddleware = require("../middlewares/auth-middleware");

const MMIL = require("../models/FormData");
const WebDev = require("../models/WebDev");
const Programming = require("../models/Programming");
const Design = require("../models/Design");
const Android = require("../models/Android");
const User = require("../models/User");
const Resume = require("../models/Resume");

require("../db/connect");

const SECRET_KEY = process.env.JWT_SECRET;

const validateRequiredFields = (obj, fields) => {
  for (const field of fields) {
    if (!obj[field]) {
      return false;
    }
  }
  return true;
};

router.get("/", (req, res) => {
  res.send(`Hello world from the server`);
});

router.post("/name", async (req, res) => {
  try {
    const { formType } = req.body;
    let token;

    if (!formType) {
      return res.status(422).json({ error: "Form type is required" });
    }

    switch (formType) {
      case "MMIL": {
        const { name, year, email, rollNo, domain, phoneNo, branch } = req.body;
        const requiredFields = [
          "name",
          "email",
          "year",
          "rollNo",
          "domain",
          "phoneNo",
          "branch",
        ];

        if (!validateRequiredFields(req.body, requiredFields)) {
          return res
            .status(422)
            .json({ error: "Please fill all the provided fields" });
        }

        const userExist = await MMIL.findOne({ email });
        if (userExist) {
          return res.status(422).json({ error: "Email already exists" });
        }

        const user = new MMIL({
          year,
          name,
          rollNo,
          branch,
          email,
          phoneNo,
          domain,
        });
        await user.save();

        token = jwt.sign({ userId: user._id }, SECRET_KEY, {
          expiresIn: "48h",
        });
        break;
      }

      case "WebDev": {
        const { phoneNo, githubLink, hostedSiteLink } = req.body;

        if (!phoneNo || !githubLink) {
          return res
            .status(422)
            .json({ error: "Please fill all the provided fields" });
        }

        const user = new WebDev({ phoneNo, githubLink, hostedSiteLink });
        await user.save();
        break;
      }

      case "Programming": {
        const { phoneNo } = req.body;

        if (!phoneNo) {
          return res
            .status(422)
            .json({ error: "Please fill all the provided fields" });
        }

        const user = new Programming({ phoneNo });
        await user.save();
        break;
      }

      case "Design": {
        const { phoneNumber, figmaLink } = req.body;

        if (!phoneNumber || !figmaLink) {
          return res
            .status(422)
            .json({ error: "Please fill all the provided fields" });
        }

        const user = new Design({ phoneNumber, figmaLink });
        await user.save();
        break;
      }

      case "Android": {
        const { phoneNumber, githubLink, gDriveLink } = req.body;

        if (!phoneNumber) {
          return res
            .status(422)
            .json({ error: "Please fill all the provided fields" });
        }

        const user = new Android({ phoneNumber, githubLink, gDriveLink });
        await user.save();
        break;
      }

      default:
        return res.status(422).json({ error: "Invalid form type" });
    }

    const response = { message: "Form submitted successfully" };
    if (token) response.token = token;

    res.status(201).json(response);
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

router.get("/user_list", async (req, res) => {
  try {
    const [
      mmilUsers,
      webDevUsers,
      programmingUsers,
      designUsers,
      androidUsers,
    ] = await Promise.all([
      MMIL.find(),
      WebDev.find(),
      Programming.find(),
      Design.find(),
      Android.find(),
    ]);

    const mergedUsers = mergeUsers(
      mmilUsers,
      webDevUsers,
      programmingUsers,
      designUsers,
      androidUsers
    );

    res.status(200).json(mergedUsers);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function mergeUsers(
  mmilUsers,
  webDevUsers,
  programmingUsers,
  designUsers,
  androidUsers
) {
  const mergedUsers = {};

  const mergeUserCollection = (collection) => {
    collection.forEach((user) => {
      const phoneKey = user.phoneNo || user.phoneNumber;
      if (!phoneKey) return;

      if (!mergedUsers[phoneKey]) {
        mergedUsers[phoneKey] = {};
      }
      mergedUsers[phoneKey] = {
        ...mergedUsers[phoneKey],
        ...user.toObject(),
      };
    });
  };

  // Merge all collections
  mergeUserCollection(mmilUsers);
  mergeUserCollection(webDevUsers);
  mergeUserCollection(programmingUsers);
  mergeUserCollection(designUsers);
  mergeUserCollection(androidUsers);

  return Object.values(mergedUsers);
}

// Get most recent user
router.get("/user", async (req, res) => {
  try {
    const userData = await MMIL.findOne().sort({ _id: -1 }).limit(1);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { phoneNo, email } = req.body;

    if (!phoneNo || !email) {
      return res
        .status(400)
        .json({ error: "Phone number and email are required" });
    }

    const user = await MMIL.findOne({ phoneNo, email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await MMIL.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const resume = new Resume({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        file: req.file.buffer,
        uploadedBy: req.user._id,
      });

      await resume.save();

      res.status(201).json({
        message: "Resume uploaded and stored in database successfully",
        resumeId: resume._id,
      });
    } catch (err) {
      console.error("Resume upload error:", err);
      res.status(500).json({ message: "Error uploading resume" });
    }
  }
);


router.get("/resume/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.set({
      "Content-Type": resume.contentType,
      "Content-Disposition": `inline; filename="${resume.filename}"`,
    });

    res.send(resume.file);
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).json({ message: "Error retrieving resume" });
  }
});


module.exports = router;
