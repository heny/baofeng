function listMenu(){   //点播菜单
    var listMenu = document.getElementsByClassName("list_choose")[0];
    var li = listMenu.children[0].children;
    for(var i=0;i<li.length;i++){
        li[i].children[0].onclick = function(){
            for(var i=0;i<li.length;i++){
                li[i].children[0].className = "";
            }
            this.className = "active";
        }
    }
}
listMenu();

function partitions(){
    var partitions = document.getElementsByClassName("partitions")[0];
    var li = partitions.children[0].children;
    for(var i=0;i<li.length;i++){
        li[i].children[0].onclick = function(){
            for(var i=0;i<li.length;i++){
                li[i].children[0].className = "";
            }
            this.className = "active";
        }
    }
}
partitions();