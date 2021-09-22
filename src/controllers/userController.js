const express = require("express");
const { hashPassword, compared } = require("../helper/bcrypt.utils");
const userDb = require("../models/user");
const {generateToken} = require("../helper/jwt");

class User {
  static async registerUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = userDb.find((e_user) => e_user.email === req.body.email);
      if (user) {
        return res.status(409).json({ error: "The user email already exist" });
      }
      const newUser = {
        id: userDb.length + 1,
        firstName,
        lastName,
        email,
        password: hashPassword(password),
      };
      userDb.push(newUser);
      const token = generateToken(newUser.email, newUser.id);
      console.log(">>>>>>>>>>>>>>>",token);
      const userInfo = { ...newUser, token };
      delete userInfo.password;
      return res
        .status(201)
        .json({ message: "registration successful", userInfo });
    } catch (error) {
      return res.status(500).send("Internal sever error");
    }
  }
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = userDb.find((e_user) => e_user.email === email);

      if (!user) {
        return res
          .status(404)
          .json({ message: "email provided doesn't exit " });
      }
      let checkPassword = compared(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({ error: "Auth failed" });
      }
      return res
        .status(200)
        .json({ message: "you  have logged in successfully" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = User;
