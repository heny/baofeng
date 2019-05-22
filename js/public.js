//顶部导航栏
function TopNav(obj){
    this.top_nav = document.getElementById(obj);
    this.login = this.top_nav.getElementsByClassName("login")[0]; 
    this.signIn = this.top_nav.getElementsByClassName("signIn")[0]; 
    this.loGin = this.top_nav.getElementsByClassName("loGin")[0];     //nav登录按钮  
    this.SignIn = this.top_nav.getElementsByClassName("SignIn")[0];//nav注册按钮
    this.loginClose = this.top_nav.getElementsByClassName("loginClose")[0];
    this.signInClose = this.top_nav.getElementsByClassName("signInClose")[0];
    this.cover = document.getElementsByClassName("coverAll")[0];
    var _this = this;
    this.SignIn.onclick = function(){   //点击注册
        _this.signIn.style.display = "block";
        _this.cover.style.display = "block";
    }
    this.loGin.onclick = function(){   //点击登录
        _this.cover.style.display = "block";
        _this.login.style.display = "block";
    }
    this.loginClose.onclick = function(){  //关闭登录
        _this.cover.style.display = "none";
        _this.login.style.display = "none";
    }
    this.signInClose.onclick = function(){  //关闭注册
        _this.signIn.style.display = "none";
        _this.cover.style.display = "none";
    }
}
new TopNav("top_nav")

//回到顶部
function gotop(){
    var topBtn = document.getElementsByClassName("return_top")[0];
    window.onscroll = function(){
        var tops = document.documentElement.scrollTop || document.body.scrollTop;
        if(tops >= 100){
            topBtn.style.display = "block";
        }else{
            topBtn.style.display = "none";
        }
    }
    topBtn.onclick = function(){
        var tops = document.documentElement ||document.body;
        tops.scrollTop = 0;
    }
}
gotop();
