const express = require("express");
const authMiddleware = require("../Middlewares");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "TATHVA@NITC";
const { User } = require("../Db/Database.js");
const { UserSchema } = require("../ZodSchema.js");

const router = express.Router();

router.get("/read", authMiddleware, (req, res) => {
  const body = req.body;
  const ZodVerify = UserSchema.safeParse(body);
  if (!ZodVerify.success) {
    return res.json({
      message: "Invalid data",
    });
  }
  const Username = body.Username;
  const Password = body.Password;
  const FirstName = body.FirstName;
  const LastName = body.LastName;
  return res.json({
    message: "User has read access",
    Username,
    Password,
    FirstName,
    LastName,
  });
});

router.post("/create", async (req, res) => {
  const body = req.body;
  const ZodVerify = UserSchema.safeParse(body);
  if (!ZodVerify.success) {
    return res.json({
      message: "Invalid data",
    });
  }

  const Username = body.Username;
  const Password = body.Password;
  const FirstName = body.FirstName;
  const LastName = body.LastName;
  const CreateToken = JWT.sign({ Username }, JWT_SECRET);

  const NewAccount = await User.create({
    Username,
    Password,
    FirstName,
    LastName,
  });

  return res.json({
    message: "User created successfully",
    CreateToken: CreateToken,
  });
});

router.delete("/delete", async (req, res) => {
  const body = req.body;
  const Username = body.Username;
  const UserToDelete = await User.findOneAndDelete({ Username });
  if (!UserToDelete) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({
    message: "User deleted successfully",
  });
});

router.put("/update", authMiddleware, async (req, res) => {
  const body = req.body;
  const Username = req.Username;
  const UserToUpdate = await User.findOne(Username, body, { new : true});

  if (!UserToUpdate) {
  }
  return res.json({
    message: "User updated successfully",
  });
  return;
});

module.exports = router;
