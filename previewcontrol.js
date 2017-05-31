const express = require('express');
const app = express();
const net = require('net');
const parser = require('body-parser');
const jsonParser = parser.json();
const moment = require('moment');
const cors = require('cors');
const path = require('path');
const webpack = require('webpack');
const UUID = require('uuid');
const fs =require('fs');
const absolute_path = '';
const archiver = require('archiver');


const child_process = require('child_process')


var pid;

app.use(cors())
app.use(function(req,res,next){
    console.log('workspace called @'+moment().format("YYYY-MM-DD HH:mm:ss" )+'\nurl='+req.url+'\tbody='+req.body);
    next();
});



app.post('/api/start',jsonParser,function(req,res){
 var  child =  child_process.exec( 'node ./preview.js' , function(err, stdout , stderr ) {
   console.log(stdout);
   pid = child.pid;
   console.log(pid);
   res.json({});
 });
    
    
});

app.post('/api/stop',jsonParser,function(req,res){
//    child_process.exec( 'kill -9 [id]' , function(err, stdout , stderr ) {
//    console.log(stdout);pid
//    pid = child.pid;
//  });
        process.kill(pid);
    
});




var acServer = app.listen(9001, 300, function () {
    console.log("workspace ac start @"+9001+ ' [port]');
});


