const path = require("path");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getUser);

router.get("/user/:id", userController.getUser);

router.get("/user", userController.getUser);

router.post("/add-user", userController.addUser);
router.use('/edit-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
module.exports = router;
