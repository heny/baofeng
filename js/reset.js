var reg = {
    phone: /^1\d{10}$/,
    password: /^(?![a-zA-Z]+$)(?!\d+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,32}$/,
    qq : /^[1-9][0-9]{4,9}$/,
    email : /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
    trim : /^\s*|\s*$/g,
    idcard:/^[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x$/,
    zuoji:/^0\d{2,3}-[1-9]\d{6,7}$/
}

/***********************获取元素兼容浏览器*******************/
function getStyle(obj,arrt){
    if(obj.currentStyle){   //如果浏览器有这个属性就执行下面的代码
        return obj.currentStyle[arrt];
    }else{    //如果浏览器没有这个属性，就执行这行
        return getComputedStyle(obj)[arrt];
    };
};

/**********************通过id获取元素******************/
function getId(val){
    return document.getElementById(val);
};
/**********************通过标签获取元素******************/
function getTag(val){
    return document.getElementsByTagName(val);
};
/********************移动方块***********************/
function setMove(step,target,attr,obj,timing){   //step 步长，target 目标值，attr属性名，obj元素对象，timing运行时间；
    clearInterval(obj.set);    //先清除自身的set属性
    var aa = parseInt(getComputedStyle(obj)[attr]);
    step = aa < target ?  step : -step;
    obj.set = setInterval(function(){   //设置一个set属性给自身，将函数加到自身;
        aa+=step;
        var aa = parseInt(getComputedStyle(obj)[attr]) + step;
        if(aa >= target && step > 0 || aa <= target && step < 0){    //判断两个条件；
            aa = target;
            clearInterval(obj.set);
        }
        obj.style[attr] =aa + "px";
        // console.log(aa);
    },timing);
}

/*************缓冲运动*********** */
function buffer(obj,json,fn){
    clearInterval(obj.t);
    obj.t = setInterval(function(){
        var flag = true;
        for(var attr in json){
            var lefts = obj.currentStyle ? attr == "opacity" ? obj.currentStyle[attr] * 100 : parseInt(obj.currentStyle[attr]) : attr == "opacity" ? getComputedStyle(obj)[attr] * 100 : parseInt(getComputedStyle(obj) [attr]);    //判断使用IE还是其他浏览器；
            var step = (json[attr] - lefts)/20;   //匀速运动
            step = step > 0 ? Math.ceil(step) : Math.floor(step);     //向上和向下取整
            lefts+=step; 
            if(lefts != json[attr]) flag = false;    //判断是否都到达目标；
            obj.style[attr] = attr == "opacity" ? obj.style[attr] = lefts/100 : obj.style[attr] = lefts + "px";  //判断传入的参数；
        }
        if(flag){   //到达目标则清除定时器；
            clearInterval(obj.t)
            fn && fn();
        }
    },50)
}

/********************补零********************** */
function setZero(val){
    return val >= 10 ? val : "0" + val;    //判断是否大于10，是的话直接返回，不是的话返回补零；
}
/************随机取整************* */
function getRandom(n,m){
    if(n > m){
        var nu = n;
        n=m;
        m=nu;
    };
    return Math.floor(Math.random()*(m-n)+n);
};

/****************给年和月，返回有多少天星期几********************** */
function getDayweek(year,month){
    return {
       date: new Date(year,month,0).getDate(),
       week: new Date(year,month-1,1).getDay()
    }
};

/************求斐波那契数列第几个数************* */
function getFib(n) {
    if (n === 1 || n === 2) return 1;
    return fn(n - 1) + fn(n - 2);
};

/*************绑定事件*********** */
function bind(obj,even,fn){  //元素，事件，事件处理函数；
    if(obj.attachEvent){
        obj.attachEvent("on" + even,function(){
            fn.call(obj);   //兼容this指向
        });
    }else{
        obj.addEventListener(even,fn,false);
    }
}
/*************取消事件绑定*********** */
function unbind(obj,even,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(even,fn,false);
    }else{
        obj.detachEvent("on" + even,fn);
    }
}

/***********设置cookie*************** */
//key 名字  value 值    time  过期天数；
function setCookie(key,value,time){
    var date = new Date;
    date.setDate(date.getDate() + time);
    document.cookie = key + "=" + value + "; expires=" + date.toString();
}

/************获取cookie的值********* */
//key 名字   填写名字返回值；
function getCookie(key){
    var ary = document.cookie.split("; ");
    var flag = true;
    var obj = {};
    for(var i=0;i<ary.length;i++){
        var ary1 = ary[i].split("=");
        if(key){
            if(ary1[0] == key){   //判断是否有这个名字
                flag = true;
                return ary1[1];
            }else{   //没有就返回false；
                flag = false;
            }
        }else{
            obj[ary1[0]] = ary1[1];
        }   
    }
    if(key && !flag){  //输入错误返回-1，输入为空返回对象
        return -1;
    }else{
        return obj;
    }
}

/***********删除cookie********** */
//key 名字
function removeCookie(key){
    setCookie(key,1,-1);
}

/**************删除首尾空格******************/
function trim(str){
    return str.replace(/^\s+|\s+$/g,'');
}

/*************获取ajax************** */
function ajax(method, url, fn,data) {
    var ajax = new XMLHttpRequest();
    if(method == 'get'){
        if(data){
            ajax.open(method, url + '?' + data, true)
        }else{
            ajax.open(method,url,true)
        }
        ajax.send()
    }else{
        ajax.open(method,url,true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8")
        if(data){
            ajax.send(data);
        }else{
            ajax.send();
        }
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            fn(ajax.responseText);
        }
    }
}

/**********封装获取元素***********/
//obj 元素 father可选  从父元素下获取元素
function $(obj,father) {
    if(typeof(father) != 'undefined'){
        return father.querySelectorAll(obj);
    }else{
        return document.querySelector(obj);
    }
}

/**********封装获取元素样式**********/
//obj 元素 attr 属性名  value可选（如不填写则获取值） 属性值
function css(obj,attr,value){
    if(typeof(value) == 'undefined'){
        return getComputedStyle(obj)[attr];
    }else{
        return obj.style[attr] = value;
    }
}