const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const cors = require('cors');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors());

const usersRoutes = require('./routes/Users/Users');
const beersRoutes = require('./routes/Beers/Beers');
const commentsRoutes = require('./routes/Comentaire/Com');

app.use(usersRoutes);
app.use(beersRoutes);
app.use(commentsRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});