let express = require('express');
let app = express();
let path = require('path');
require('dotenv').config()
let cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

let bankRouter = require('./routes/bankRoutes');

// Mongoose connection
let mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', bankRouter);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
