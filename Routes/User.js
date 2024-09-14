const express = require("express");
const authMiddleware = require("../Middlewares");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "TATHVA@NITC";

const router = express.Router();

router.get("/read", authMiddleware, (req, res) => {
  return res.json({ message: "User has read access" });
});

router.post("/create", (req, res) => {
  const body = req.body;

  const email = body.email;
  const CreateToken = JWT.sign({ email }, JWT_SECRET);
  return res.json({
    message: "User created successfully",
    CreateToken: CreateToken,
  });
});

router.delete("/delete", authMiddleware, (req, res) => {
    const body = req.body;
    
    const email = body.email;
    const CreateToken = JWT.sign({ email }, JWT_SECRET);
    return res.json({
      message: "User created successfully",
      CreateToken: CreateToken,
    });
  });

  router.put("/update", authMiddleware, (req, res) => {
    const body = req.body;
    return res.json({
        message: "User updated successfully",
    })
  });

module.exports = router;
