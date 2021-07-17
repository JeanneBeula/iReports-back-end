const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const signupValidation = require('../models/user');

router.use(express.json());

const Users = [];

// Get all Users
router.get("/users", (req, res) => {
  res.send(Users);
});

// Create new user
router.post("/signUp", (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = Users.find((e_user) => e_user.email === req.body.email);
  if (user) {
    return res.status(409).send("The user email already exist");
  } else {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        const user = {
          id: Users.length + 1,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        };
        Users.push(user);
        res.status(201).send(Users);
      }
    });
  }
});

module.exports = router;
