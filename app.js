const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, ()=>{});