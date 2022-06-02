const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Mongoose Validation / Mongo DB Check
  // NPM Package JOI
  // Controller Check
  if (!username || !password) {
    throw new BadRequestError("Please provide a username and password");
  }

  // Fake id as don't have a DB
  const id = new Date().getDate();

  // JWT
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username ?? "Unknown"}`,
    secret: `Your data and lucky number is ${luckyNumber}.`,
  });
};

module.exports = {
  login,
  dashboard,
};
