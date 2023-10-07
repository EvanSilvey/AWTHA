const env = require("dotenv").config().parsed
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@rankd.tueohuj.mongodb.net/RankdDB?retryWrites=true&w=majority`)
    } catch (err) {
        console.log(err)
    }
}

connectDB()

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://10.0.0.209:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/', router);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(11037, () => {
        console.log("Server Started on port 11037");
    });
})

mongoose.connection.on('error', err => {
    console.log(err)
})
