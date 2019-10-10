"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var app = express();
const path = require("path");
const bodyParser = require("body-parser");
// import * as cookieParser from "cookie-parser"
const api_1 = require("./routes/api");
const view_1 = require("./routes/view");
// mongoose connection
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/practice', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function () {
    console.log('connect to database');
});
// app.use('/',(req,res,next)=>{
//     res.send('Hello Everyone')
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use('/', view_1.default);
app.use('/api', api_1.default);
app.listen('3000');
//# sourceMappingURL=app.js.map