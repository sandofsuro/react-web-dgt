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

var status = {};

app.use(cors())
app.use(function(req,res,next){
    console.log('workspace called @'+moment().format("YYYY-MM-DD HH:mm:ss" )+'\nurl='+req.url+'\tbody='+req.body);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

//relative_path: /Examples/dgt/index.web.js
//absolute_path: ''
app.post('/api/status',jsonParser,function(req,res){
     var id =req.body.id;
     if(!status[id]){
         res.json({resultCode:404,msg:"not found"});
     }else{
         res.json({resultCode:status[id],msg:getStatusMsg(status[id])});
     }
});

var getStatusMsg = function(statusCode){
    switch(statusCode){
        case 1: return "building";
        case 2: return "zipping";
        case 3: return "failed";
        case 4: return "success" 
        default: return "unknown";
    }
}

app.post('/api/buildBundle',jsonParser,function(req,res){
    var body =req.body;
    var taskId =  UUID.v4();
    var result = false;
    
    var relative_path = req.body.relative_path;
    // var title = req.body.title;


    if(!relative_path){
        callBackFaild(res,"no relative_path");
    }
    var entryPath = path.resolve(absolute_path,relative_path);
    console.log("entryPath: "+entryPath);

    var wc=require('./webpack.config.1');
    
    var wpResultPath= path.resolve(__dirname, 'public',taskId);
    fs.access(wpResultPath,function(err){
        if(err){
            fs.mkdir(wpResultPath);
        }
    });
    var wcResult = wc(entryPath,wpResultPath);
     var compiler = webpack(wcResult);
    compiler.run(function(err, stats) {
        var options = {
        colors: true
        };

         console.log(stats.toString(options));
        status[taskId] = -1;
        if(err) 
            console.log(err+"======================");
        else
            zipfile(wpResultPath);
        //console.log(stats.startTime);
     });

    if(result){
        status[taskId] = 3;
        callBackFaild(res,"system err");
    }else{
        status[taskId] = 1;
        res.json({result:"ok",id:taskId});
    }
    
});
var callBackFaild = function(res,msg){
    res.json({result:"faild",msg:msg});
}



var acServer = app.listen(9000, 300, function () {
    console.log("workspace ac start @"+9000+ ' [port]');
});


var zipfile = function (path){
    var output = fs.createWriteStream(path + '/example-output.zip');
    var archive = archiver('zip');

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);


archive.directory(path).finalize();  
  
};

//unzip:
// var AdmZip = require('adm-zip');

// 	var zip = new AdmZip("./12.zip");
// 	zip.extractAllTo("./",true);
	





// var taskId =  UUID.v4();
//     var result = false;
//     var relative_path = req.body.relative_path;
//     var bunbleName = req.body.bunbleName;


//     if(!relative_path){
//         callBackFailed(res,"no relative_path");
//     }
//     var entryPath = path.resolve(absolute_path,relative_path);
//     console.log("entryPath: "+entryPath);

//     var wc=require('./webpack.config.2');
    
//     var wpResultPath= path.resolve(__dirname, 'public',taskId);
//     fs.access(wpResultPath,function(err){
//         if(err){
//             fs.mkdir(wpResultPath);
//         }
//     });
//     var wcResult = wc([{name:'a',path:'path',title:'htmlTitle',htmlFileName:'filename.html'}],wpResultPath);
//      var compiler = webpack(wcResult);
//     compiler.run(function(err, stats) {
//         var options = {
//         colors: true
//         };

//          console.log(stats.toString(options));
//         status[taskId] = -1;
//         if(err) 
//             console.log(err+"======================");
//         else
//             //zipFile(wpResultPath);
//            console.log("zip");
//         //console.log(stats.startTime);
//      });

//     if(result){
//         status[taskId] = 3;
//         callBackFailed(res,"system err");
//     }else{
//         status[taskId] = 1;
//         res.json({result:"ok",id:taskId});
//     }
    

    // app.post('/api/testzip',jsonParser,function(req,res){
//     var sourcePath = __dirname + '/public' ;
//     var targetPath = __dirname + '/public/bundle.zip';

//     unzipfile(targetPath,sourcePath);

// });