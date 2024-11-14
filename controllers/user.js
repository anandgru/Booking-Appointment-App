const User = require("../models/user");

exports.addUser = (req, res, next) => {
    if (req.params.id) {
        users = User.findByPk(req.params.id);
        if (!users) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        users.update(req.body);
      } else {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  User.create({
    name: name,
    email: email,
    phone: phone,
  })
    .then((result) => {
      console.log("User created successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Failed to create user",
      });
    });
}
};
exports.getUser = async(req, res, next) => {
    let users;
    try{
        if (req.params.id) {
      users = await User.findByPk(req.params.id);
    } else {
      users = await User.findAll();
    }
    if (!users) {
      return res.status(404).json({
        message: "Users not found",
      });
    }
    res.json(users);
    }
    catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch users",
    });
}
}
/* exports.getUser = async (req, res) => {
  try {
    const users = await User.findByPk(req.params.id);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }

  //res.sendFile(__dirname + "/index.html");
}; */

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    //console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    
    //await user.update(req.body);
    await user.update({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update user",
    });
  }
};
