var fs = require('fs');
var path = require('path');
var unzipMoudle = require('unzip');
var archiver = require('archiver');

/**
 *解压缩
 *@param sourceZip : 压缩包全路径
 *@param targetDir : 解压目录
 */
exports.unzip = function(sourceZip, targetDir, callback) {
	fs.exists(sourceZip, function(exists) {
		if (exists) { //zip包存在
			mkdirsSync(targetDir); //确保解压目录存在
			var readStream = fs.createReadStream(sourceZip);
			var writeStream = unzipMoudle.Extract({
				path: targetDir
			});
			readStream.on('error', function(err, data) {
				exe_callback(err, data, callback);
			});
			writeStream.on('error', function(err, data) {
				exe_callback(err, data, callback);
			});
			readStream.pipe(writeStream);
			writeStream.on('close', function() {
				exe_callback(null, null, callback);
			});
		} else { //zip包不存在
			exe_callback(sourceZip + "不存在，无法解压", null, callback);
		}
	});
}

/**
 *压缩
 *@param sourcePath : 被压缩文件或者目录
 *@param targetPath : 生成的压缩文件全路径
 */
exports.zip = function(sourcePath, targetPath, callback) {
	fs.exists(sourcePath, function(exists) {
		if (exists) {
			fs.lstat(sourcePath, function(err, stat) {
				var archive = archiver('zip');
				archive.on('error', function(err) {
					exe_callback(err, null, callback);
				});
				var writeStream = fs.createWriteStream(targetPath);
				archive.pipe(writeStream);
				writeStream.on('close', function(err, data) {
					exe_callback(err, data, callback);
				});
				writeStream.on('error', function(err, data) {
					exe_callback(err, data, callback);
				});
				if (stat.isDirectory()) {
					archive.directory(sourcePath, "");
				} else {
					archive.file(sourcePath, {
						name: path.basename(sourcePath)
					});
				}
				archive.finalize();
			});
		} else {
			exe_callback(sourcePath + "不存在,压缩失败", null, callback);
		}
	});
}


/**
 *压缩多个文件到一个压缩包
 *@param sourceFiles : 文件数组[fullFilePath]
 *@param targetPath : 生成的压缩文件全路径
 */
exports.zipFiles = function(sourceFiles, targetPath, callback) {
	if (null == sourceFiles || sourceFiles.length <= 0) {
		exe_callback("被压缩文件数目<=0", null, callback);
		return;
	}
	if (null == targetPath || targetPath.trim().length == 0) {
		exe_callback("参数targetPath不能为空", null, callback);
		return;
	}
	var archive = archiver('zip');
	archive.on('error', function(err, data) {
		exe_callback(err, data, callback);
	});
	var writeStream = fs.createWriteStream(targetPath);
	archive.pipe(writeStream);
	writeStream.on('close', function(err, data) {
		exe_callback(err, data, callback);
	});
	writeStream.on('error', function(err, data) {
		exe_callback(err, data, callback);
	});
	for (var i = 0; i < sourceFiles.length; i++) {
		if (fs.existsSync(sourceFiles[i])) {
			archive.file(sourceFiles[i], {
				name: path.basename(sourceFiles[i])
			});
		}
	}
	archive.finalize();
}



/**
 *同步方法
 *创建目录
 */
function mkdirsSync(dirPath) {
	if (!fs.existsSync(dirPath)) {
		mkdirsSync(path.join(dirPath, "../"));
		fs.mkdirSync(dirPath);
	}
}


/**
 *执行callback
 */
function exe_callback(err, data, callback) {
	if (callback && typeof callback === 'function') {
		callback(err, data);
	}
}