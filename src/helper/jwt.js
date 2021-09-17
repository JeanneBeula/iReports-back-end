const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateToken(email, id) {
  try {
    const token = jwt.sign({ email, id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
return token;
  } catch (error) {
    console.log(">>>>>rro>>>>>>>>>>", error.message);
  }
}
    module.exports = { generateToken };
