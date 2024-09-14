const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const {askGPT} = require('./controllers/openAiController');
const validateToken = require('./middleware/validateToken');

connectDb();

//API intialization
const app = express();
const corsOption = {
    origin: 'http://localhost:5173',
    methods : ['GET', 'POST'],
    credentials: true
}
const PORT = process.env.PORT || 7000

//Appling modules
app.use(express.json());
app.use(cors(corsOption));
app.use(morgan('dev'));

//Setting routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.post('/api/v1/openAi', validateToken, async (req,res) => {
    let question = req.body.message;
    console.log(question);
    let responseData = await askGPT(question);
    console.log(responseData);
    return res.status(200).json({message: responseData});
});
app.use(errorHandler);


//Server initiating
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});