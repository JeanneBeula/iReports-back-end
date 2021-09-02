const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const Router = require("./src/routes/index");
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", Router);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`"Listening on  port ${port} ...."`));
