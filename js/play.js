//补零
function setZero(val) {
    return val >= 10 ? val : "0" + val;
}

//封装获取元素
//obj 元素 father可选  从父元素下获取元素(父元素下获取需要加下标)
function $(obj,father) {
    if(typeof(father) != 'undefined'){
        return father.querySelectorAll(obj);
    }else{
        return document.querySelector(obj);
    }
}

//封装获取元素样式
//obj 元素 attr 属性名  value可选（如不填写则获取值） 属性值
function css(obj,attr,value){
    if(typeof(value) == 'undefined'){
        return getComputedStyle(obj)[attr];
    }else{
        return obj.style[attr] = value;
    }
}

//注册框验证
function Signin() {
    var signin = document.getElementsByClassName("signIn")[0];
    var hint2 = signin.getElementsByClassName("signIn_prompt")[0];
    var form2 = signin.getElementsByTagName("form")[0];

    //判断手机号是否输入正确
    form2.user.onblur = function () {
        var regPhone = /^1\d{10}$/; //判断手机号
        if (form2.user.value.trim() == '') {
            console.log(1);
            hint2.innerHTML = "手机号格式不正确";
            hint2.style.color = 'red';
            form2.user.style.border = "1px solid #ddd"
        }

        if (!regPhone.test(form2.user.value)) {
            hint2.innerHTML = "手机号格式不正确";
            hint2.style.color = 'red';
            form2.user.style.border = "1px solid #ddd"
        } else {
            hint2.innerHTML = '';
            form2.user.style.border = "1px solid #ddd"
        }
    }
    form2.user.onfocus = function () {
        form2.user.style.border = "1px solid #1a9eff"
    }

    //判断密码是否输入正确
    form2.psd.onblur = function () {
        var regPasd = /^(?![a-zA-Z]+$)(?!\d+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,32}$/
        if (form2.psd.value.trim() == '') {
            hint2.innerHTML = "请输入6-32位英文、数字和符号的组合密码";
            hint2.style.color = 'red';
            form2.psd.style.border = "1px solid #ddd"
        }

        if (!regPasd.test(form2.psd.value)) {
            hint2.innerHTML = "请输入6-32位英文、数字和符号的组合密码";
            hint2.style.color = 'red';
        } else {
            hint2.innerHTML = '';
            form2.psd.style.border = "1px solid #ddd"
        }
    }
    form2.psd.onfocus = function () {
        form2.psd.style.border = "1px solid #1a9eff"
    }
}
Signin();

//滚动条
function vipScroll() {
    var Sidebox = document.getElementsByClassName("movie_num_box")[0];
    var bar = document.getElementsByClassName("bar")[0];
    var num = 0;
    Sidebox.onmousewheel = function (e) {
        var e = e || window.event;
        var tops = parseInt(getComputedStyle(bar).top);
        var Sidetops = parseInt(getComputedStyle(Sidebox).top);
        if (e.wheelDelta <= 0) {
            tops += 42
            Sidetops -= 50;
        } else {
            tops -= 42;
            Sidetops += 50;
        }
        if (tops <= 0) {
            tops = 0;
            Sidetops = 0;
        }
        if (tops >= 438) tops = 438;
        if (Sidetops <= -460) Sidetops = -460;

        this.style.top = Sidetops + 'px';
        bar.style.top = tops + 'px';

        return false;
    }
    bar.onmousedown = function (e) {
        var e = e || window.event;
        //获取鼠标按下时y的位置；因为第二次按下会多滚动条到top的距离，所以需要减去；
        var b = e.clientY - bar.offsetTop;
        console.log(b);
        document.onmousemove = function (e) {
            var e = e || window.event;
            var x = e.clientY - b;   //减去按下的距离
            console.log(x);
            if (x <= 0) {
                x = 0;
            } else if (x >= 438) {   //如果滚动条的高度大于438就等于438；
                x = 438;
            }
            Sidebox.style.top = -x + 'px';
            bar.style.top = x + 'px';
            console.log(x);

        }
        //ie8捕获兼容拖动文字
        if (bar.setCapture) {
            bar.setCapture();
        }
        return false;
    }
    document.onmouseup = function () {
        document.onmousemove = null;
        if (bar.setCapture) {
            bar.relaseCapture();
        }
    }
}
vipScroll();

//电影榜
function Rank() {
    var ranking = document.getElementsByClassName("ranking-list-cont")[0];
    var li = ranking.children;
    for (var i = 0; i < li.length; i++) {
        li[i].onmouseover = function () {
            for (var j = 0; j < li.length; j++) {
                li[j].children[0].style.display = "none";
                li[j].children[1].style.display = "block";
            }
            this.children[0].style.display = "block";
            this.children[1].style.display = "none";
        }
    }
}
Rank();
//评论举报
function Jubao() {
    var div = document.getElementsByClassName("comment-cont")[0];
    var li = div.children[0].children;
    for (var i = 0; i < li.length; i++) {
        li[i].onmouseover = function () {
            for (var i = 0; i < li.length; i++) {
                li[i].children[4].children[0].style.display = 'none';
            }
            this.children[4].children[0].style.display = 'block';
        }
        li[i].onmouseout = function () {
            this.children[4].children[0].style.display = 'none';
        }
    }
}
Jubao();

//回到顶部
function gotop() {
    var topBtn = $(".return_top");
    var feed = $(".feedback");
    window.onscroll = function () {
        var tops = document.documentElement.scrollTop || document.body.scrollTop;
        if (tops >= 100) {
            topBtn.style.display = "block";
            feed.style.display = "block";
        } else {
            topBtn.style.display = "none";
            feed.style.display = "none";
        }
    }
    topBtn.onclick = function () {
        var tops = document.documentElement || document.body;
        tops.scrollTop = 0;
    }
}
gotop();

//发表评论
function Talk() {
    //点击发表 发表评论
    var txt = $(".input-com-cont");
    var ul = $(".play-part-right").getElementsByClassName("comment-cont")[0].children[0];

    $(".part-com-btn").onclick = function () {

        var date = new Date();
        var time = date.getFullYear() + "-" + setZero((date.getMonth() + 1)) + "-" + setZero(date.getDate()) + " " + setZero(date.getHours()) + ":" + setZero(date.getMinutes());

        var li = document.createElement("li");
        li.innerHTML = `
        <img src="images/baofengplay/userhead2.jpg" alt="">
        <p class="user-name">`+ Math.floor(parseInt(Math.random() * 1000) + 1000) + `</p>
        <p class="user-speak-time">`+ time + `</p>
        <p class="user-speak-cont">
            `+ txt.value + `
        </p>
        <p class="com-operate">
            <a href="javascript:void(0);" class="juBao">举报</a><a href="javascript:void(0);" class="zan"></a><i>0</i>
        </p> 
        `;

        if (txt.value.trim()) {
            ul.insertBefore(li, ul.children[0]);
            $("i",$(".part-com-num"))[0].innerHTML = ul.children.length;
            txt.value = '';
        }
    }
    //当输入框获取焦点，开始定时器，执行数字减减
    txt.onfocus = function (e) {
        var sum = 10000;    //声明数字计算定时器执行次数；
        var num = 140;
        var t = setInterval(function () {
            sum--;
            if (sum <= 0) {  //如果定时器执行超过次数则停止；
                clearInterval(t);
                txt.blur();
            }
            $("i",$(".part-com-rem"))[0].innerHTML = num - txt.value.length;
        });

    }
}
Talk();
