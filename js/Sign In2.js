$(":text").blur(function(){
    if(!$(":text").val().trim()){
        $(this).parents(".SignIn").children("span").html("请输入用户名");
    }
})