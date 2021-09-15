const express = require("express");
const { hashPassword } = require("../utils/bcrypt");
const userDb = require("../models/user");

class User {
  static async registerUser(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = userDb.find((e_user) => e_user.email === req.body.email);
      if (user) {
        return res.status(409).json({ error: "The user email already exist" });
      } else {
        const hashedPassword = hashPassword(password);
        const user = {
          id: userDb.length + 1,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        };
        userDb.push(user);
        let userRes = null;
        if (
          userDb.find((itm) => itm.id === user.id).id !== undefined &&
          userDb.find((itm) => itm.id === user.id).id !== null
        ) {
          userRes = {
            firstName,
            lastName,
            email,
          };
        }
        res.status(201).json(userRes);
      }
    } catch (error) {
      return res.status(500).send("Internal sever error");
    }
  }
}
module.exports = User;
