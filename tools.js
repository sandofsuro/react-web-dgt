/**
 * Created by jiangqifan on 16/2/29.
 */

//var bcrypt = require('bcryptjs');
var moment = require('moment');
//
moment.locale('zh-cn'); // 使用中文
var fs = require('fs');
var request = require('request');
var archiver = require('archiver');
var config = require('../config');
var path = require('path');
var uuid = require('uuid');
var logger = require('log4js').getLogger();

 //格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};
//
//exports.validateId = function (str) {
//    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
//};

//exports.bhash = function (str, callback) {
//    bcrypt.hash(str, 10, callback);
//};
//
//exports.bcompare = function (str, hash, callback) {
//    bcrypt.compare(str, hash, callback);
//};

function tryCallback(callback, err, data){
  if('function' === typeof callback){
    callback(err, data);
  }
}


/**
 * @param localPath 本地文件路径
 * @param url
 * @param callback
 */
exports.upload = function(local_path, url, callback){
  logger.info('begin to upload file:'+local_path + ' to '+ url);
  try{
      fs.accessSync(local_path);
  }catch(e){
      return tryCallback(callback,"no such file " +　local_path);
  }
    fs.createReadStream(local_path)
        .pipe(request.post(url).on('response', function (response) {
          logger.info('upload response.');
          pareseResponseJSON(response, function(err,response){
            if(err || 200 != response.statusCode || !response){
              logger.error("upload error:");
              logger.error(err);
              logger.error(response);
              return tryCallback(callback,"upload error", null);
            }else{
              return tryCallback(callback, null, response.body);
            }
          })
    }));
};

exports.download = function(url, local_path, callback) {

  logger.info('begin to download file from ' + url + ' to ' + local_path);

  request.get(url).on('error', function(err) {
    tryCallback(err);
  }).pipe(fs.createWriteStream(local_path)).on('close',function(){
    tryCallback(callback);
  });
}

/**
 * @param
 * @param
 * @param
 */
exports.zipDir = function(dir, targetPath, callback){
  var archive = archiver.create('zip', {});

};

exports.createTempDirSync = function(dir){
  var temp_dir = config.sdp_dir.temp_dir;
  ensureDirExistSync(temp_dir);
  console.log("===========",temp_dir)
  var name = uuid.v1();
  if(dir){
    name = dir;
  }
  var sub_dir = path.join(temp_dir,name);
  ensureDirExistSync(sub_dir);

  return sub_dir;
}


function ensureDirExistSync(dir){
    try{
        fs.accessSync(dir, fs.R_OK | fs.W_OK);
        return true;
    }catch(err){
    }
    fs.mkdirSync(dir);
}

function pareseResponseJSON(response, callback){
   var data = [];
   response.on('data', function(chunk) {
     data.push(chunk);
   });
   response.on('end', function() {
     logger.info(data.join(''));
       try{
           var result = JSON.parse(data.join(''));
           response.body = result;
           callback(null,response);
       }catch(err){
           callback(err);
       }
   });
}


exports.pareseResponseJSON = pareseResponseJSON;


function ensureDirSync(dir){
  try {
    fs.accessSync(dir,fs.R_OK);
  } catch(e){
    fs.mkdirSync(dir);
  }
}
exports.mkdirsSync = mkdirsSync;

var mkdirsSync  = function(dirpath) {
    try{
        fs.accessSync(dirpath);
        return true;
    }catch(e){
        mkdirsSync(path.dirname(dirpath));
        fs.mkdirSync(dirpath);
    }
};

exports.ensureDirSync = ensureDirSync;

exports.rmdirAllSync = (function () {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);//收集目录
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);//直接删除文件
        }
    }

    function inner(path, dirs) {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }

    return function (dir) {

        var dirs = [];

        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
        } catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            if(e.code !== "ENOENT"){
                throw e;
            }
        }
    }
})();
