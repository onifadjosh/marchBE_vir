const UserModel = require("../models/user.model");

const getDbUserPage = (req, res) => {
  let message = "";
  res.render("addDbUser", { message });
};

const saveDbUser =async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let message;
  try {
    await UserModel.create(req.body);
    message = "User created successfully";
    res.render("addDbUser", { message });
  } catch (error) {
    console.log(error);

    if (error.code == 11000) {
      message = "User already exist";
      res.render("addDbUser", { message });
    } else {
      message = "User creation failed";
      res.render("addDbUser", { message });
    }
  }
};

const getDbUser =async (req, res) => {
  try {
    let users = await UserModel.find().select("-password");
    console.log(users);

    // res.render("dbUsers", { users });
    res.status(200).send({
        message:"users retreived successfully",
        data:users
    })
  } catch (error) {
    console.log(error);
    users = [];
    res.render("dbUsers", { users });
  }
};

module.exports={
    getDbUserPage,
    saveDbUser,
    getDbUser
}
