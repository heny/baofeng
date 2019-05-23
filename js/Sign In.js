var user = $("input[name=user]");
var psd = $("input[name=psd]");
var span = $(".code-prompt");


var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var sum = '';
for (var i = 0; i < 6; i++) {
    var num = str[Math.floor(Math.random() * str.length)]
    sum += num;
}
$(".getCode").innerHTML = sum;

$(".next").onclick = function(){
    $(".getCode").innerHTML = str[Math.floor(Math.random() * str.length)] + str[Math.floor(Math.random() * str.length)] + str[Math.floor(Math.random() * str.length)] + str[Math.floor(Math.random() * str.length)] + str[Math.floor(Math.random() * str.length)] + str[Math.floor(Math.random() * str.length)]
}



//判断是否有输入;
$("input[type=submit]").onclick = function () {
    if (!user.value.trim()) {
        alert("请输入用户名和密码！！！");
        return false;
    } else if (!psd.value.trim()) {
        alert("请输入密码！！！");
        return false;
    } else if (span.innerHTML != '') {
        alert("请输入正确的用户名和密码！！！");
        return false;
    }else if($("input[name=code]").value != $(".getCode").innerHTML){
        alert("验证码输入不正确!!");
        return false;
    }
}

// var ree = /(^&\w+\d$)/g
// var sb = location.search.replace(ree,function($0,$1,$2){
//     return $2;
// })
if(document.cookie){
    var strdata = location.search.split("?")[1].split("&");
    var jsondata = {};
    for(var i=0;i<strdata.length;i++){
        var arr = strdata[i].split("=");
        if(arr[0] == "user" || arr[0] == "psd"){
            jsondata[arr[0]] = arr[1];
        }
    }
    setCookie("user",jsondata.user,1)
    setCookie("password",jsondata.psd,1)
}


//用户名输入框
user.onblur = function () {
    if (!user.value.trim()) {
        span.innerHTML = "请输入手机号！";
    } else if (!reg.phone.test(user.value)) {
        span.innerHTML = "请输入正确的手机号！"
    } else {
        span.innerHTML = "";
        css($(".getMessage"),"background","linear-gradient(#fff,#f2f2f2)");
        css($(".getMessage"),"color","#333");
        css($(".getMessage"),"cursor","pointer");
    }
}

//密码输入框
psd.onblur = function () {
    if (!psd.value.trim()) {
        span.innerHTML = "请输入密码!";
    } else if (!reg.password.test(psd.value)) {
        span.innerHTML = "密码需要6-32位，并且英文数字组合，请重新输入！";
    } else {
        span.innerHTML = "";
    }
}


//判断密码输入强度
psd.onfocus = function () {
    var sum = 10000;
    var t = setInterval(function () {
        sum--;
        if (sum <= 0) {
            clearInterval(t);
            psd.blur();
        }
        if (psd.value.length >= 6 && psd.value.length <= 10) {
            css($(".intensity"), "background-position", "-70px -70px");
        } else if (psd.value.length >= 10 && psd.value.length <= 16) {
            css($(".intensity"), "background-position", "-100px -70px");
        } else if (psd.value.length >= 16 && psd.value.length <= 30) {
            css($(".intensity"), "background-position", "-130px -70px");
        } else {
            css($(".intensity"), "background-position", "-40px -70px");
        }
    });
}
