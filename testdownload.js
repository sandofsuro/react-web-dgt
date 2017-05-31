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

//获取构建服务状态
app.post('/api/status',jsonParser,function(req,res){
     var id =req.body.id;
     if(!status[id]){
         res.json({resultCode:404,msg:"not found"});
     }else{
         res.json({resultCode:status[id],msg:getStatusMsg(status[id])});
     }
});

app.post('/api/getBundle',jsonParser,function(req,res){
    var id =req.body.id;
    if(!status[id]){
         res.json({resultCode:404,msg:"not found"});
     }else{
         res.json({resultCode:status[id]});
     }
    
});

app.post('/api/uploadProjectZip',jsonParser,function(req,res){
    var id =req.body.id;
    
});

app.post('/api/getLog',jsonParser,function(req,res){
    
});

app.post('/api/buildBundle',jsonParser,function(req,res){
    var id =req.body.id;
    var buildType= req.body.buildType;
    if(buildType == 'develop'){
        
    }else{

    }
    
});

app.post('/api/getSpaces',jsonParser,function(req,res){
    var taskId =  UUID.v4();
    var wpResultPath= path.resolve(__dirname, 'public',taskId);
        fs.access(wpResultPath,function(err){
            if(err){
                fs.mkdir(wpResultPath);
            }
        });
    return taskId ;

});




var callBackFailed = function(res,msg){
    res.json({result:"faild",msg:msg});
}   



var acServer = app.listen(9000, 300, function () {
    console.log("workspace ac start @"+9000+ ' [port]');
});


//压缩文件
var zipfile = function (path){
    var output = fs.createWriteStream(path+'/test.zip');
    var archive = archiver('zip', {
    zlib: { level: 1 } });
    output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function(err) {
                 throw err;
    });

    archive.pipe(output);

    archive.directory(path+'/');

    archive.finalize();
};

//执行构建
var buildBundle = function(){

};

//下载project.zip文件
var downLoadLProject = function(){

};


var getStatusMsg = function(statusCode){
    switch(statusCode){
        case 1: return "building";
        case 2: return "zipping";
        case 3: return "failed";
        case 4: return "success" 
        default: return "unknown";
    }
};





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
    