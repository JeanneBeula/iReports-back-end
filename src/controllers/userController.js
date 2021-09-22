const express = require("express");
const { hashPassword, compared } = require("../helper/bcrypt.utils");
const userDb = require("../models/user");
const { generateToken } = require("../helper/jwt");
const { v4 } = require("uuid");

class User {
  static async registerUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = userDb.find((e_user) => e_user.email === req.body.email);
      if (user) {
        return res.status(409).json({ error: "The user email already exist" });
      }
      const newUser = {
        id: v4(),
        firstName,
        lastName,
        email,
        password: hashPassword(password),
      };
      userDb.push(newUser);
      const token = generateToken(newUser.email, newUser.id);
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
      const token = generateToken(user.email, user.id);

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
        .json({ message: "you  have logged in successfully", token });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getUsers(req, res) {
    try {
      if (userDb.length <= 0) {
        return res.status(404).json({ status: 404, error: "user not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "List of Users", userDb });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = User;
