var user = $("input[name=user]");
var psd = $("input[name=psd]");
var span = $(".code-prompt");

//判断是否有输入;
$("button").onclick = function(){
    if(!user.value.trim()){
        alert("请输入用户名和密码！！！");
        return false;
    }else if(!psd.value.trim()){
        alert("请输入密码！！！");
        return false;
    }else if(span.innerHTML != ''){
        alert("请输入正确的用户名和密码！！！");
        return false;
    }
}
//用户名输入框
user.onblur = function(){
    if(!user.value.trim()){
        span.innerHTML = "请输入用户名！";
    }else if(!reg.phone.test(user.value)){
        span.innerHTML = "请输入正确的用户名！"
    }else{
        span.innerHTML = "";
    }
}

//密码输入框
psd.onblur = function(){
    if(!psd.value.trim()){
        span.innerHTML = "请输入密码!";
    }else if(!reg.password.test(psd.value)){
        span.innerHTML = "密码输入不正确，请重新输入！";
    }else{
        span.innerHTML = "";
    }
}

//如果是火狐则获取cookie并设置
if(/firefox/i.test(navigator.userAgent)){
    user.value = getCookie("user");
    psd.value = getCookie("password");
}else{
    user.value = '';
    psd.value = '';
}

