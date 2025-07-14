
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connectDB} = require('./utils/database');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/weather'));

connectDB();


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
