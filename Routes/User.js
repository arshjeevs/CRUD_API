const express = require("express");
const authMiddleware = require("../Middlewares");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "TATHVA@NITC";
const { User } = require("../Db/Database.js");
const { UserSchema } = require("../ZodSchema.js");

const router = express.Router();

router.get("/read", async (req, res) => {
  try {
    const { Username } = req.body;

    if ( !Username ) {
      return res.status(400).json({
        message: "Username is required",
      });
    }



    // const ZodVerify = UserSchema.safeParse({ Username, Password, FirstName, LastName });

    // if (!ZodVerify.success) {
    //   return res.json({
    //     message: "Invalid data",
    //   });
    // }

    const UserToRead = await User.findOne({ Username }); 

    if (!UserToRead) {
      return res.status(404).json({
        message: "User not found",
       });
     }

    return res.json({
      message: "User has read access",
      user: UserToRead,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while reading the user.",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { Username, Password, FirstName, LastName } = req.body;

    if (!Username || !Password || !FirstName || !LastName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const ZodVerify = UserSchema.safeParse({ Username, Password, FirstName, LastName });

    if (!ZodVerify.success) {
      return res.json({
        message: "Invalid data",
      });
    }

    const CreateToken = JWT.sign({ Username }, JWT_SECRET);
    const NewAccount = await User.create({ Username, Password, FirstName, LastName });

    return res.json({
      message: "User created successfully",
      user: NewAccount,
      token: CreateToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the user.",
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { Username } = req.body;
    const UserToDelete = await User.findOneAndDelete({ Username });
    
    if (!UserToDelete) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the user.",
    });
  }
});

router.put("/update", async (req, res) => {
  const { Username } = req.body;
  const dataToUpdate = req.body;
  try {
    const UserToUpdate = await User.findOne({ Username });

    if (!UserToUpdate) {
      return res.status(404).json({
        message: "User not found",
       });
     }
     
    const updatedUser = await User.findOneAndUpdate({ Username },dataToUpdate,{"new" : true});
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch(error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the user.",
  })};
});

module.exports = router;