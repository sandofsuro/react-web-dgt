import { Platform,} from 'react-native';


var url = "http://123.56.199.100:3000";
var token = null;

var Api={
    userInfo: {}
};

var fetch =require('ReactFetch');
//注册
Api.register = function(realName, userName, idCardNumber,  phoneNumber, password, callback) {
    var body = {
        name: realName,
        username: userName,
        idcardnum: idCardNumber,
        phonenum: phoneNumber,
        password: password,
    };
    
    sendHttpRequest('/app/v1/user/register', 'POST', body, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//登录
Api.login = function(userName, password, callback) {
    var body = {
        username: userName,
        password: password,
    };
    
    sendHttpRequest('/app/v1/user/login', 'POST', body, function(responseData) {
        if(responseData.success == true) {
            Api.userInfo.userId = responseData.data._id;
            Api.userInfo.userRealName = responseData.data.name;
            Api.userInfo.userLoginName = responseData.data.username;
            Api.userInfo.userScore = responseData.data.score;
            Api.userInfo.userAvatar = responseData.data.avatar_url;
            Api.userInfo.userPhoneNumber = responseData.data.phone_num;
            Api.userInfo.userSignTotal = responseData.data.sign_all;
            Api.userInfo.userSignContinue = responseData.data.sign_continue;
            token = responseData.data.token;
        }
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//修改个人信息
Api.modifyUserInfo = function(userId, avatar, userName, phoneNumber, address, signature, callback) {
    var body = null;
    if(avatar.startWith('http')) {
        body = {
            username: userName,
            phone_num: phoneNumber,
        };
    } else {
        body = {
            avatar_data: avatar,
            username: userName,
            phone_num: phoneNumber,
        };
    }
    
    sendHttpRequest('/app/v1/user/'+userId+'?token='+token, 'POST', body, function(responseData) {
        if(responseData.success == true) {
            Api.userInfo.userLoginName = responseData.data.username;
            Api.userInfo.userAvatar = responseData.data.avatar_url;
            Api.userInfo.userPhoneNumber = responseData.data.phone_num;
        }
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//修改密码
Api.modifyPassword = function(userId, oldPwd, newPwd, callback) {
    var body = {
        old_password: oldPwd,
        new_password: newPwd,
    };
    
    sendHttpRequest('/app/v1/user/'+userId+'/password?token='+token, 'POST', body, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//签到
Api.sign = function(userId, callback) {
    var body = {
        user_id: userId,
    };
    
    sendHttpRequest('/app/v1/user/sign?token=' + token, 'POST', body, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//查询签到
Api.checkSign = function(userId, begin, end, callback) {
    sendHttpRequest('/app/v1/user/signed?token='+token+'&user_id='+userId+'&begin='+begin+'&end='+end, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//查询积分榜
Api.checkScoreRank = function(callback) {
    sendHttpRequest('/app/v1/user/scorerank?token=' + token, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//获取问卷调查
Api.quiz = function(userId, callback) {
    sendHttpRequest('/app/v1/questions?user_id='+userId+'&token=' + token, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//提交问卷调查
Api.commitQuiz = function(userId, quizId, callback) {
    var body = {
        user_id: userId,
    };
    
    sendHttpRequest('/app/v1/questions/'+quizId+'/commit?token='+token, 'POST', body, function(responseData) {
        if(responseData.success == true) {
            Api.userInfo.userScore = responseData.data.score;
        }
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//获取轮播图（已废弃）
Api.getBanners = function(callback) {
    sendHttpRequest('/app/v1/banners?token=' + token, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//获取文章
Api.getArticles = function(type, callback) {
    sendHttpRequest('/app/v1/articles?token='+token+'&home=true&topic=' + type, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//获取电话黄页
Api.getContacts = function(callback) {
    sendHttpRequest('/app/v1/contacts?token=' + token, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//新增反映情况
Api.newFeedBack = function(userId, title, content, callback) {
    var body = {
        title: title,
        content: content,
        user_id: userId,
    };
    
    sendHttpRequest('/app/v1/feedback?token=' + token, 'POST', body, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//追加反映情况
Api.appendFeedBack = function(id, userId, content, callback) {
    var body = {
        user_id: userId,
        content: content,
    };
    
    sendHttpRequest('/app/v1/feedback/'+id+'/commit?token=' + token, 'POST', body, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//查询反映情况
Api.checkFeedBack = function(userId, status, callback) {
    var url = '';
    if(status == null) {
        url = '/app/v1/feedback?token='+token+'&user_id=' + userId;
    } else {
        url = '/app/v1/feedback?token='+token+'&status=' + status + '&user_id=' + userId;
    }
    sendHttpRequest(url, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

//查询更新
Api.getInfo = function(callback) {
    sendHttpRequest('/app/v1/info?token='+token, 'GET', null, function(responseData) {
        callback(responseData);
    }, function(err) {
        console.log(err);
    });
}

String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  

function sendHttpRequest(relativeUrl, method, body, success, error) {
    body = (!body ? body : JSON.stringify(body));
    fetch(url + relativeUrl, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((response) => response.json())
    .then((responseData) => success(responseData))
    .catch((err) => error(err));
}

module.exports=Api;