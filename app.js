"use strict";

const express = require("express");
const logger = require("morgan");
const ip = require("ip");
const path = require("path");
require("dotenv").config();
 

 
const app = express();
const http = require('http').createServer(app)


app.use(express.json());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res)=>{
    return res.sendFile(__dirname + '/index.html')
} )



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    if (req.accepts("json")) {
        res.status(404).send({ message: "API URL not found" });
        return;
    }
});

// Server Running and Port listening
const port = process.env.PORT || 3001;
const host = process.env.NODE_ENV === 'dev' ? '0.0.0.0' : ip.address();

// const host = "localhost";
http.listen(port, host, () => {
    console.log(`Server is runing on http://${host}:${port} - ${ip.address()}`);
});



//SOCKET

const io = require('socket.io')(http)
io.on("connection", (socket) => {
  // ...
  console.log("Connection Successfull!");
  socket.on('message', (msg)=>{
    socket.broadcast.emit('message', msg)
  })

});


module.exports = app;
