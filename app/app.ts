import * as express from "express";
var app:express.Application = express();
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from "body-parser";
// import * as cookieParser from "cookie-parser"
import apiRouter from './routes/api';
import viewRouter from './routes/view';




// mongoose connection
import * as mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/practice',{ useNewUrlParser: true })
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.on('open', function(){
    console.log('connect to database')
})

// app.use('/',(req,res,next)=>{
//     res.send('Hello Everyone')
// })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, "../public")));

app.use('/',viewRouter);
app.use('/api', apiRouter);

app.listen('3000');
