const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Connect_DB } = require('./DB_Connection');
const routes = require('./routes/index');
dotenv.config();
const app = express();
app.use(express.json());
Connect_DB();
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
const PORT = process.env.PORT || 5000

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})


