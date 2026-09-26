
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../Model/users-model");

const getAllUsers = async (_req, res) => {

  try {
    const users = await Users.find().select("-password")

    return res.status(200).json({ users })

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not fetch users"
    });
  }

}

const getSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(422).json({
        message: "User already exists, please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new Users({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      message: "Signup successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Signup failed, please try again",
    });
  }
};

  const getLogin = async (req, res) => {

    const { email, password } = req.body;

    let identifiedUser;

    try {
      identifiedUser = await Users.findOne({ email: email })
    } catch (err) {
      return res.status(500).json({
        message: "Login failed, Please try again"
      });
    }
    if (!identifiedUser) {
      return res.status(401).json({
        message: "User not found"
      })
    }

    let isValidPassword;

    try {
      isValidPassword = await bcrypt.compare(password, identifiedUser.password)
    } catch (err) {
      return res.status(500).json({
        message: "Could not log you in, Please try again"
      })
    }
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" })
    }

    let token;

    try {
      token = jwt.sign(
        {
          userId: identifiedUser._id,
          email:  identifiedUser.email,
          role: identifiedUser.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      )
    }catch (err) {
      return res.status(500).json({
        message: "Login failed, Please try again"
      })
    }


    return res.status(200).json({
      message: "Login Successfully",
      user: {
        id: identifiedUser._id,
        name: identifiedUser.name,
        email: identifiedUser.email,
        role: identifiedUser.role
      },
      token
    })
  }

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not delete user",
    });
  }
};

const createAdmin = async (req, res) => {
 
  try {
    const { name, email, password } = req.body

const existingAdmin = await Users.findOne({ email });

if (existingAdmin) {
  return res.status(400).json({
    message: "User with email already exists"
  })
}

const hashedPassword = await bcrypt.hash(password, 10)

const admin = new Users({
  name,
  email,
  password: hashedPassword,
  role: "admin",
})

await admin.save();

return res.status(201).json({
  message: "Admin created successfully",
  admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  },
})

  }catch (error) {
    console.error(error);

return res.status(500).json({
  message: "Could not create admin"
})

  }
}



module.exports = { getSignUp,  getLogin, 
  getAllUsers, deleteUser, createAdmin };