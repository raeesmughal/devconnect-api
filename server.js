const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler.js');
const authRoutes = require('./routes/authRoutes.js')

connectDB();
app.use(express.json());
app.use(errorHandler);
app.use('/api/auth',authRoutes);






const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running at : http://localhost:${PORT}`)
})