const express = require('express'); //Express framework
const morgan = require('morgan'); //morgan (dev)
const cors = require('cors'); //cors error
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const articlesRoute = require('./routes/articles');
const app = express(); //app

//database connection
require('dotenv').config();
const db = process.env.databasePassword;

mongoose
.connect(`mongodb+srv://samandarjumanov:${db}@cluster0.b71u4c6.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>console.log('DB connected '))
.catch((err)=>console.log(err))
//middleware

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


const port = process.env.port || 8000
//routes
app.use('/register', userRouter);
app.use('/articles', articlesRoute)
//run server
const server = app.listen(port, ()=>{
    console.log('Server is working');
});

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

function stop(){
    server.stop()
    process.exit()
}
