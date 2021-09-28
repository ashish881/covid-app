const User = require("../Model/UserModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

//login auth
// get token
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // check the email is exist and password match..
  // send the data along with token user id

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
};

//register a new user
// get token
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //check user exist
  const userExits = await User.findOne({ email });

  //if user exist then throw error
  if (userExits) {
    res.status(400).send({ message: "User Already Exist" }); //bad request
  }

  //if user not exist then create
  const user = await User.create({
    name,
    email,
    password, // unencrypted plain text
  });

  //If everything ok and user is created then send the response
  // Now we have to authenticate after register

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400).send({ message: "Invalid User Data" });
  }
};


const verifyUser = async (req, res) => {
  console.log(req.token);
  res.status(201).json({ token: req.token })
};

module.exports = { authUser, registerUser, verifyUser };
