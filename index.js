const express = require('express');
const app = express();

const userRoutes = require('./routes/user') 

app.use('/user', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`"Listening on  port ${port} ...."`));