const express = require('express');
const cors = require('cors');
const path = require('path');
const engines = require("consolidate");
const mongoose = require('./database/config');
// const multer = require('multer') ------

const server = express();

server.engine("ejs", engines.ejs);
server.set("views", "./views");
server.set("view engine", "ejs");

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({limit: '50mb' , extended: true}));


// Admin Router 
var AdminRouter = require('./routes/AdminRouter')
//Users routes
var UsersRouter = require('./routes/UsersRoute');
var Payment = require('./routes/PaymentRouter')

//Epicier routes
var EpicierRouter = require('./routes/EpicierRouter');
var CarnetRouter = require('./routes/CarnetRouter');

//Products routes
var ProductRouter = require('./routes/ProductRoute')

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: false }));
//server.use(express.static(path.join(__dirname, 'public')));


server.use('/', UsersRouter);
server.use('/', Payment)

server.get('/', (req, res)=>{
  res.send('OK')
  });

server.use('/Epicier', EpicierRouter);
server.use('/Carnet', CarnetRouter)
server.use('/product', ProductRouter)
server.use('/Admin', AdminRouter)



// error handler
server.use((req,res,next)=>{
  res.status(404).send('Sorry Dont find this route');
  
});

const PORT = process.env.PORT || 7000
server.listen(PORT,()=>{
 console.log(`Server listen this Port ${PORT}`);
});

module.exports = server
