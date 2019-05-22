//轮播图
function Lunbo(obj){
    this.carousel = document.getElementsByClassName(obj)[0];
    this.bul = this.carousel.getElementsByClassName("carouselImgl")[0];  //大图
    this.sul = this.carousel.getElementsByClassName("carouselImgs")[0];  //小图
    this.left = this.carousel.getElementsByClassName("carousel_pre")[0];  //左边的按钮
    this.right = this.carousel.getElementsByClassName("carousel_next")[0]; //右边的按钮
    this.sli = this.sul.children;  //每个小图的li
    this.bli = this.bul.children;  //每个大图的li
    this.timer = null;
    this.count = 0;
}
Lunbo.prototype.init = function(){   //主程序
    var _this = this;
    
    //开始定时器；
    this.timer = setInterval(function(){
        _this.auto();   
    },2000)

    //划过划离
    this.carousel.onmouseover = function(){
        clearInterval(_this.timer);
    }
    this.carousel.onmouseout = function(){
        var othis = _this; //保留指向构造函数的this；
        _this.timer = setInterval(function(){
            othis.auto();  //开启定时器
        },2000)
    }

    //左右箭头
    this.right.onclick = function(){
        _this.auto();
    }
    this.left.onclick = function(){
        _this.count--;
        if(_this.count == -1){
            _this.count = 8;
        }
        _this.Change();
    }
}
Lunbo.prototype.Over = function(){  //划过每个小图片
    var _this = this;
    clearInterval(this.timer)
    for(var i=0;i<this.sli.length;i++){
        this.sli[i].index = i;
        this.sli[i].onmouseover = function(){
            _this.count = this.index;  //小图片的下标
            _this.Change();  //顺序不能反了
        }
    }
}
Lunbo.prototype.Change = function(){  //每张图的变化
    for(var i=0;i<this.sli.length;i++){
        this.sli[i].className = "";
        this.bli[i].className = "";
        this.bli[i].style.opacity = "0.5";
        this.sli[i].children[0].children[0].className = "";
    }
    this.sli[this.count].className = "active";
    this.bli[this.count].className = "active";
    this.sli[this.count].children[0].children[0].className = "Oimg";
    buffer(this.bli[this.count],{"opacity":100})
}
Lunbo.prototype.auto = function(){  //移动
    this.count++;
    if(this.count >= this.bli.length){
        this.count=0;
    }
    for(var i=0;i<this.bli.length;i++){
        this.sli[i].className = "";
        this.bli[i].className = "";
        this.bli[i].style.opacity = "0.3";
        this.sli[i].children[0].children[0].className = "";
    }
    this.sli[this.count].className = "active";
    this.bli[this.count].className = "active";
    this.sli[this.count].children[0].children[0].className = "Oimg";
    buffer(this.bli[this.count],{"opacity":100})
}
var lunbo = new Lunbo("carousel");
lunbo.Over();
lunbo.init();

//vip专区滑块
function Ruller(obj){
    this.vipRoller = document.getElementsByClassName(obj)[0];
    this.left = this.vipRoller.getElementsByClassName("roll_left")[0];
    this.right = this.vipRoller.getElementsByClassName("roll_right")[0];
    this.rollWrap = this.vipRoller.getElementsByClassName("roll_wrap")[0];
}
Ruller.prototype.Move = function(){ //左右按钮
    var _this = this;
    this.right.onclick = function(){
        setMove(80,-1075,"left",_this.rollWrap,30);
    }
    this.left.onclick = function(){
        setMove(80,0,"left",_this.rollWrap,30);
    }
    
}
var rull = new Ruller("vip_roller");
rull.Move();