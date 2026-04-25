const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASS
  }
});

const getDbUserPage = (req, res) => {
  let message = "";
  res.render("addDbUser", { message });
};

const saveDbUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let message;
  try {
    let salt = 20;
    let saltRound = await bcrypt.genSalt(salt);

    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    message = "User created successfully";

    const token = await jwt.sign({ id: user._id }, process.env.APP_TOKEN, {
      expiresIn: "5h",
    });
    // res.render("addDbUser", { message });
    res.status(201).send({
      message,
      data: {
        firstName,
        lastName,
        email,
        token,
      },
    });

    let mailOptions = {
      from: process.env.APP_MAIL,
      to: ["agbonyinclement@gmail.com", "adedejiemmanuel57@gmail.com", "ayanbiyiabiodunmichael@gmail.com"],
      subject: "Welcome to the Next Level 🥳",
      text: 'That was easy!, from your dearest instructor'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);

    if (error.code == 11000) {
      message = "User already exist";
      //   res.render("addDbUser", { message });
      res.status(400).send({
        message,
      });
    } else {
      message = "User creation failed";
      //   res.render("addDbUser", { message });

      res.status(500).send({
        message,
      });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        message: "invalid credentials",
      });

      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).send({
        message: "invalid credentials",
      });

      return;
    }
    const token = await jwt.sign({ id: user._id }, process.env.APP_TOKEN, {
      expiresIn: "5h",
    });
    res.status(200).send({
      message: "user logged in successful",
      data: {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "invalid credentials",
    });
  }
};
const getDbUser = async (req, res) => {
  try {
    let users = await UserModel.find().select("-password");
    console.log(users);

    // res.render("dbUsers", { users });
    res.status(200).send({
      message: "users retreived successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    users = [];
    res.render("dbUsers", { users });
  }
};

const deleteDbUser = async (req, res) => {
  const { id } = req.params;

  try {
    await UserModel.findByIdAndDelete(id);

    res.status(200).send({
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "failed to delete user",
    });
  }
};

const editDbUser = async (req, res) => {
  const { id } = req.params;
  const { firstName } = req.body;

  try {
    await UserModel.findByIdAndUpdate(
      id,
      { firstName },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      message: "error updating user",
    });
  }
};

const verifyUser = async (req, res, next) => {
  console.log(req.headers["authorization"]);
  
  const token = req.headers["authorization"].split(" ")[1]
    ? req.headers["authorization"].split(" ")[1]
    : req.headers["authorization"].split(" ")[0];
  console.log(token);

  try {
    await jwt.verify(token, process.env.APP_TOKEN, function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(401).send({
          message: "user unauthorized",
        });
        return;
      }

      console.log(decoded);
      req.user = decoded;

      next();
    });
  } catch (error) {
    res.status(401).send({
      message: "user unauthorized",
    });
  }
};

module.exports = {
  getDbUserPage,
  saveDbUser,
  getDbUser,
  deleteDbUser,
  editDbUser,
  login,
  verifyUser,
};
